import { HttpException, HttpStatus, Injectable, Query } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { AffichageNewUserDTO, AffichageUserDTO, AffichageUserSmollDTO } from "src/shared/dto/_users/affichage/affichageUser.dto"
import { RankId } from "src/shared/dto/_users/rankId.dto"
import { UserId } from "src/shared/dto/_users/userId.dto"
import { UserRank } from "src/shared/dto/_users/userRank.dto"
import { RanksEntity } from "src/shared/entities/rank.entity"
import { UsersEntity } from "src/shared/entities/user.entity"
import { Repository } from "typeorm"
import { UserModified } from "src/shared/dto/_users/userModified.dto"
import * as argon2 from 'argon2'
import { NewUserDTO } from "src/shared/dto/_users/newUser.dto"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity) private usersRepo: Repository<UsersEntity>
        , @InjectRepository(RanksEntity) private rankRepo: Repository<RanksEntity>
    ) { }

    async getAll(includeDeleted: boolean): Promise<AffichageUserSmollDTO[]> {
        let filter = {
            relations: {
                rank: true
            }
            , withDeleted: false
        }
        if (includeDeleted.toString() == 'true') {
            filter.withDeleted = true
        }

        let allUsers = await this.usersRepo.find(filter).catch(() => { throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND) })

        let formattedUsers: AffichageUserSmollDTO[] = allUsers.map((user) => ({
            id: user.id
            , avatar: user.avatar === 'img=' ? null : 'http://localhost:5000/api/users/image/' + user.id
            , login: user.login
            , rank: user.rank.rank
            , deletedAt: user.deletedAt != null
        }));

        return formattedUsers;
    }

    async getOne(userId: number, includeDeleted: boolean): Promise<AffichageUserDTO> {
        let filter = {
            where: { id: userId }
            , relations: {
                rank: true
            }
            , withDeleted: false
        }
        if (includeDeleted.toString() == 'true') {
            filter.withDeleted = true
        }

        let oneUser = await this.usersRepo.findOne(filter).catch(() => { throw new HttpException("Erreur lors de l'encodage de l'Id de l'utilisateur", HttpStatus.NOT_FOUND) })

        let formattedUsers: AffichageUserDTO = {
            id: oneUser.id
            , avatar: 'http://localhost:5000/api/users/image/' + oneUser.id
            , login: oneUser.login
            , mail: oneUser.mail
            , bio: oneUser.bio
            , rank: oneUser.rank
            , deletedAt: oneUser.deletedAt
        };

        return formattedUsers;
    }

    async getImage(userId: number): Promise<string> {
        let oneUser = await this.usersRepo.findOne({
            where: { id: userId },
            relations: {
                rank: true
            }
        }).catch(() => { throw new HttpException("Erreur lors de l'encodage de l'Id de l'utilisateur", HttpStatus.NOT_FOUND) })

        return oneUser.avatar;
    }

    async findByEmail(email: string): Promise<UsersEntity> {
        let oneUser = await this.usersRepo.findOne({
            where: { mail: email },
            relations: {
                rank: true
            }
        }).catch(() => { throw new HttpException("Erreur lors de l'encodage de l'Id de l'utilisateur", HttpStatus.NOT_FOUND) })

        return oneUser;
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await argon2.verify(hashedPassword, password)
            .catch(() => { throw new HttpException("Erreur lors de la comparaison des mots de passe", HttpStatus.BAD_REQUEST) })
    }

    async create(newUser: NewUserDTO): Promise<AffichageNewUserDTO> {
        const options = {
            type: argon2.argon2id,
            memoryCost: 2 ** 16, // Paramètres de coût de mémoire
            hashLength: 256, // Longueur du hash en octets
        };

        const hashedPassword = await argon2.hash(newUser.mdp, options);

        let userEntityCreated = this.usersRepo.create({
            ...newUser,
            mdp: hashedPassword // Stocke le hash du mot de passe dans l'entité utilisateur
        })

        userEntityCreated.rank = await this.rankRepo.findOne({ where: { id: 4 } })
        userEntityCreated.avatar = 'img'

        console.log(userEntityCreated);

        let resultSave = await this.usersRepo
            .save(userEntityCreated)
            .catch(_ => { throw new HttpException("Erreur inconnue (mais plutôt grave) lors de l'enregistrement de l'utilisateur", HttpStatus.FORBIDDEN) })

        let formattedUsers: AffichageNewUserDTO = {
            id: resultSave.id
            , login: resultSave.login
            , mail: resultSave.mail
        };

        return formattedUsers;
    }

    async update(userId: UserId, updateToUser: UserModified): Promise<AffichageUserDTO> {
        let userExist = await this.usersRepo.findOneOrFail({
            where: { id: userId },
            select: { rank: { rank: true, id: true } },
            relations: { rank: true }
        }).catch(_ => { throw new HttpException("Erreur lors du trouvage de l'utilisateur", HttpStatus.NOT_FOUND) })

        userExist.avatar = updateToUser.avatar
        userExist.login = updateToUser.login
        userExist.mail = updateToUser.mail
        userExist.bio = updateToUser.bio

        // Vérifie si un nouveau mot de passe a été fourni
        if (updateToUser.nmdp) {
            // Vérifie que le mot de passe existant correspond
            const passwordMatch = await argon2.verify(userExist.mdp, updateToUser.mdp);
            if (!passwordMatch) {
                throw new HttpException("Le mot de passe existant est incorrect", HttpStatus.BAD_REQUEST);
            }

            const options = {
                type: argon2.argon2id,
                memoryCost: 2 ** 16, // Paramètres de coût de mémoire
                hashLength: 256, // Longueur du hash en octets
            };

            const hashedPassword = await argon2.hash(updateToUser.nmdp, options);
            userExist.mdp = hashedPassword;
        }

        let updatedUser = await this.usersRepo.save(userExist).catch(e => { console.log(e); throw new HttpException("Erreur lors du sauvegardage de l'utilisateur sur SQL", HttpStatus.FORBIDDEN) })

        let formattedUsers: AffichageUserDTO = {
            id: updatedUser.id
            , avatar: updatedUser.avatar
            , login: updatedUser.login
            , mail: updatedUser.mail
            , bio: updatedUser.bio
            , rank: userExist.rank
            , deletedAt: userExist.deletedAt
        };

        return formattedUsers;
    }

    async updateRank(userId: UserId, updateToRank: UserRank): Promise<RankId> {
        let userExist = await this.usersRepo.findOneOrFail({
            where: { id: userId },
            select: { rank: { rank: true, id: true } },
            relations: { rank: true }
        }).catch(_ => { throw new HttpException("Erreur lors du trouvage de l'utilisateur", HttpStatus.NOT_FOUND) })

        let rankExist = await this.rankRepo.findOneOrFail({
            where: { id: updateToRank.id }
        }).catch(_ => { throw new HttpException("Erreur lors du trouvage du rank de l'utilisateur", HttpStatus.NOT_FOUND) })

        userExist.rank = rankExist

        let updatedUser = await this.usersRepo.save(userExist).catch(e => { console.log(e); throw new HttpException("Erreur lors du sauvegardage de l'utilisateur sur SQL", HttpStatus.FORBIDDEN) })

        return 1
    }

    async reactivateUser(userId: number): Promise<AffichageUserDTO> {
        const user = await this.getOne(userId, true);

        // Réactiver l'utilisateur
        user.deletedAt = null;
        await this.usersRepo.save(user);

        return user;
    }

    async disable(userId: UserId): Promise<UserId> {
        let userExist = await this.usersRepo.findOneOrFail({ where: { id: userId } }).catch(_ => { throw new HttpException("Erreur lors du trouvage de l'utilisateur", HttpStatus.NOT_FOUND) })

        let res = await this.usersRepo.softRemove(userExist)

        return 1
    }
}

function isAdminUser(rank: RanksEntity): boolean {
    // Vérifiez si le rang de l'utilisateur est égal à 1 ou 2
    return rank.id === 1 || rank.id === 2;
}