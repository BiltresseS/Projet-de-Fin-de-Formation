import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { DistributerService } from './_distributer.service';
import { GenresDTO } from 'src/shared/dto/_genres/genres.dto';
import { DistributerDTO, NewDistributerDTO } from 'src/shared/dto/_tests/distributer.dto';

@Controller('api/distributers')
export class DistributerController {
  constructor(private readonly _distService: DistributerService) {}

  @Get()
  getAll() : Promise<GenresDTO[]>
  {
    return this._distService.getAll();
  }

  @Get(":distId")
  getOne(@Param("distId", ParseIntPipe) distId: number) : Promise<DistributerDTO>
  {
    return this._distService.getOne(distId);
  }

  @Post()
  createDev(@Body(ValidationPipe) newDev : NewDistributerDTO) : Promise<DistributerDTO>
  {
    return this._distService.createDist(newDev);
  }
}