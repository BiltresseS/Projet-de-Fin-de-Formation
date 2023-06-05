import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsoleDTO } from 'src/shared/dto/_consoles/consoles.dto';
import { ConsolesEntity } from 'src/shared/entities/console.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConsolesService {
  constructor(
    @InjectRepository(ConsolesEntity) private consoleRepo : Repository<ConsolesEntity>
  ){}

  async getAll(): Promise<ConsoleDTO[]> {
    let consoles = await this.consoleRepo.find().catch(_ => {throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND)})
  
    let formattedConsoles: ConsoleDTO[] = consoles.map((consoles) => ({
      id : consoles.id
      , name : consoles.name
    }));
  
    return formattedConsoles
  }
}