import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevelopperDTO, NewDevelopperDTO } from 'src/shared/dto/_tests/developper.dto';
import { DeveloppersEntity } from 'src/shared/entities/developpers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DevelopperService {
  constructor(
    @InjectRepository(DeveloppersEntity) private _devRepo: Repository<DeveloppersEntity>
  ) { }

  async getAll(): Promise<DevelopperDTO[]> {
    let developpers = await this._devRepo.find().catch(_ => { throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND) })

    let formattedDeveloppers: DevelopperDTO[] = developpers.map((developper) => ({
      id: developper.id
      , name: developper.name
    }));

    return formattedDeveloppers
  }

  async getOne(devId : number): Promise<DevelopperDTO> {
    let developper = await this._devRepo.findOne({where: { id: devId }}).catch(() => { throw new HttpException("Erreur lors de l'encodage de l'Id du developpeur", HttpStatus.NOT_FOUND) })

    let formattedDevelopper: DevelopperDTO = {
      id: developper.id
      , name: developper.name
    };

    return formattedDevelopper
  }

  async createDev(newDevelopper: NewDevelopperDTO): Promise<DevelopperDTO> {
    let devEntityCreated = this._devRepo.create({ ...newDevelopper })

    let resultSave = await this._devRepo
      .save(devEntityCreated)
      .catch(_ => { throw new HttpException("Erreur inconnue (mais plutôt grave) lors de l'enregistrement du développeur", HttpStatus.FORBIDDEN) })

    let formattedDev: DevelopperDTO = {
      id: resultSave.id
      , name: resultSave.name
    };

    return formattedDev;
  }
}