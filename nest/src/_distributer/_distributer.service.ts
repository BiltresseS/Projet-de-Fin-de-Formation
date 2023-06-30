import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DistributerDTO, NewDistributerDTO } from 'src/shared/dto/_tests/distributer.dto';
import { DistributersEntity } from 'src/shared/entities/distributers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DistributerService {
  constructor(
    @InjectRepository(DistributersEntity) private _distRepo: Repository<DistributersEntity>
  ) { }

  async getAll(): Promise<DistributerDTO[]> {
    let distributers = await this._distRepo.find().catch(_ => { throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND) })

    let formattedDistributers: DistributerDTO[] = distributers.map((distributer) => ({
      id: distributer.id
      , name: distributer.name
    }));

    return formattedDistributers
  }

  async getOne(distId : number): Promise<DistributerDTO> {
    let developper = await this._distRepo.findOne({where: { id: distId }}).catch(() => { throw new HttpException("Erreur lors de l'encodage de l'Id du distributeur", HttpStatus.NOT_FOUND) })

    let formattedDevelopper: DistributerDTO = {
      id: developper.id
      , name: developper.name
    };

    return formattedDevelopper
  }

  async createDist(newDevelopper: NewDistributerDTO): Promise<DistributerDTO> {
    let distEntityCreated = this._distRepo.create({ ...newDevelopper })

    let resultSave = await this._distRepo
      .save(distEntityCreated)
      .catch(_ => { throw new HttpException("Erreur inconnue (mais plutôt grave) lors de l'enregistrement du distributeur", HttpStatus.FORBIDDEN) })

    let formattedDist: DistributerDTO = {
      id: resultSave.id
      , name: resultSave.name
    };

    return formattedDist;
  }
}
