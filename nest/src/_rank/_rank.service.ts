import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRank } from 'src/shared/dto/_users/userRank.dto';
import { RanksEntity } from 'src/shared/entities/rank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RankService {
    constructor(
        @InjectRepository(RanksEntity) private _rankRepo : Repository<RanksEntity>
      ){}
    
      async getAll(): Promise<UserRank[]> {
        let ranks = await this._rankRepo.find().catch(_ => {throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND)})
      
        let formattedRanks: UserRank[] = ranks.map((rank) => ({
          id : rank.id
          , rank : rank.rank
          , users : null
        }));
      
        return formattedRanks
      }
}
