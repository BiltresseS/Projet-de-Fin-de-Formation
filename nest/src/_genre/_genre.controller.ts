import { Controller, Get } from '@nestjs/common';
import { GenreService } from './_genre.service';
import { GenresDTO } from 'src/shared/dto/_genres/genres.dto';

@Controller('api/genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  getAll() : Promise<GenresDTO[]>
  {
    return this.genreService.getAll();
  }
}
