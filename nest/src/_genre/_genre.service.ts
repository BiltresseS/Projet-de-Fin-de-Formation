import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenresDTO } from 'src/shared/dto/_genres/genres.dto';
import { GenresEntity } from 'src/shared/entities/genres.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(GenresEntity) private _genreRepo : Repository<GenresEntity>
      ){}
    
      async getAll(): Promise<GenresDTO[]> {
        let genres = await this._genreRepo.find().catch(_ => {throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND)})
      
        let formattedGenres: GenresDTO[] = genres.map((genres) => ({
          id : genres.id
          , name : genres.name
        }));
      
        return formattedGenres
      }
}
