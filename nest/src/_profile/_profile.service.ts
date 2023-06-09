import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { AffichageNewUserDTO, AffichageUserDTO, AffichageUserSmollDTO } from "src/shared/dto/_users/affichage/affichageUser.dto"
import { NewUser } from "src/shared/dto/_users/newUser.dto"
import { RankId } from "src/shared/dto/_users/rankId.dto"
import { User } from "src/shared/dto/_users/user.dto"
import { UserId } from "src/shared/dto/_users/userId.dto"
import { UserRank } from "src/shared/dto/_users/userRank.dto"
import { RanksEntity } from "src/shared/entities/rank.entity"
import { UsersEntity } from "src/shared/entities/user.entity"
import { Repository } from "typeorm"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity) private usersRepo : Repository<UsersEntity>
        , @InjectRepository(RanksEntity) private rankRepo : Repository<RanksEntity>
        , private readonly jwtService: JwtService
        , private readonly configService: ConfigService
    ) {}

    async getAll() : Promise<AffichageUserSmollDTO[]>
    {
        let allUsers = await this.usersRepo.find({
            relations : {
                rank : true
              }
        }).catch(() => {throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND)})

        let formattedUsers: AffichageUserSmollDTO[] = allUsers.map((user) => ({
            id : user.id
            , avatar: user.avatar
            , login : user.login
            , rank: user.rank.rank
        }));
        
          return formattedUsers;
    }

    async getOne(userId : number) : Promise<AffichageUserDTO>
    {
        let oneUser = await this.usersRepo.findOne({
            where : { id : userId },
            relations : {
                rank : true
              }
        }).catch(() => {throw new HttpException("Erreur lors de l'encodage de l'Id de l'utilisateur", HttpStatus.NOT_FOUND)})

        let formattedUsers: AffichageUserDTO = {
            id : oneUser.id
            , avatar: oneUser.avatar
            , login : oneUser.login
            , mail : oneUser.mail
            , bio : oneUser.bio
            , rank: oneUser.rank.rank
        };
        
        return formattedUsers;
    }

    async findByEmail(email : string) : Promise<UsersEntity>
    {
        let oneUser = await this.usersRepo.findOne({
            where : { mail : email },
            relations : {
                rank : true
              }
        }).catch(() => {throw new HttpException("Erreur lors de l'encodage de l'Id de l'utilisateur", HttpStatus.NOT_FOUND)})
        
        return oneUser;
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean>
    {
        return await argon2.verify(hashedPassword, password)
        .catch (() => {throw new HttpException("Erreur lors de la comparaison des mots de passe", HttpStatus.BAD_REQUEST)})
    }

    async create(newUser : NewUser) : Promise<AffichageNewUserDTO>
    {
        const options = {
            type: argon2.argon2id,
            memoryCost: 2 ** 16, // Paramètres de coût de mémoire
            hashLength: 256, // Longueur du hash en octets
        };
        
        const saltRounds = 10;

        const hashedPassword = await argon2.hash(newUser.mdp, options);
        
        let userEntityCreated = this.usersRepo.create({
            ...newUser,
            mdp: hashedPassword, // Stocke le hash du mot de passe dans l'entité utilisateur
        })

        userEntityCreated.rank = await this.rankRepo.findOne({where : {id : 4}})

        let resultSave = await this.usersRepo
        .save(userEntityCreated)
        .catch(_ => {throw new HttpException("Erreur inconnue (mais plutôt grave) lors de l'enregistrement de l'utilisateur", HttpStatus.FORBIDDEN)})

        let formattedUsers: AffichageNewUserDTO = {
            id : resultSave.id
            , login : resultSave.login
            , mail : resultSave.mail
        };
        
        return formattedUsers;
    }

    async update(userId : UserId, updateToUser : User) : Promise<AffichageUserDTO>
    {
        let userExist = await this.usersRepo.findOneOrFail({
            where : {id : userId},
            select : { rank : { rank : true, id : true} },
            relations : { rank : true}
        }).catch(_ => {throw new HttpException("Erreur lors du trouvage de l'utilisateur", HttpStatus.NOT_FOUND)})
        
        userExist.avatar = updateToUser.avatar
        userExist.login = updateToUser.login
        userExist.mail = updateToUser.mail
        userExist.bio = updateToUser.bio

        let updatedUser = await this.usersRepo.save(userExist).catch(e => { console.log(e); throw new HttpException("Erreur lors du sauvegardage de l'utilisateur sur SQL", HttpStatus.FORBIDDEN)})

        let formattedUsers: AffichageUserDTO = {
            id : updatedUser.id
            , avatar: updatedUser.avatar
            , login : updatedUser.login
            , mail : updatedUser.mail
            , bio : updatedUser.bio
            , rank : userExist.rank.rank
        };
        
          return formattedUsers;
    }

    async updateRank(userId : UserId, updateToRank : UserRank) : Promise<RankId>
    {
        let userExist = await this.usersRepo.findOneOrFail({
            where : {id : userId},
            select : { rank : { rank : true, id : true} },
            relations : { rank : true}
        }).catch(_ => {throw new HttpException("Erreur lors du trouvage de l'utilisateur", HttpStatus.NOT_FOUND)})

        let rankExist = await this.rankRepo.findOneOrFail({
            where : {id : updateToRank.id}
        }).catch(_ => {throw new HttpException("Erreur lors du trouvage du rank de l'utilisateur", HttpStatus.NOT_FOUND)})

        userExist.rank = rankExist

        let updatedUser = await this.usersRepo.save(userExist).catch(e => { console.log(e); throw new HttpException("Erreur lors du sauvegardage de l'utilisateur sur SQL", HttpStatus.FORBIDDEN)})

        return 1
    }

    async disable(userId : UserId) : Promise<UserId>
    {
        let userExist = await this.usersRepo.findOneOrFail({where : {id : userId}}).catch(_ => {throw new HttpException("Erreur lors du trouvage de l'utilisateur", HttpStatus.NOT_FOUND)})

        let res = await this.usersRepo.softRemove(userExist)

        return 1
    }
}