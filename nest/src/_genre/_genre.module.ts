import { Module } from '@nestjs/common';
import { GenreService } from './_genre.service';
import { GenreController } from './_genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresEntity } from 'src/shared/entities/genres.entity';

@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports : [
    TypeOrmModule.forFeature([
        GenresEntity
    ])
]
})
export class GenreModule {}
