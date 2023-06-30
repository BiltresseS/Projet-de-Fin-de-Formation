import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, ValidationPipe, Put } from '@nestjs/common';
import { DevelopperService } from './_developper.service';
import { DevelopperDTO, NewDevelopperDTO } from 'src/shared/dto/_tests/developper.dto';

@Controller('api/developpers')
export class DevelopperController {
  constructor(private readonly _devService: DevelopperService) {}

  @Get()
  getAll() : Promise<DevelopperDTO[]>
  {
    return this._devService.getAll();
  }

  @Get(":devId")
  getOne(@Param("devId", ParseIntPipe) devId: number) : Promise<DevelopperDTO>
  {
    return this._devService.getOne(devId);
  }

  @Post()
  createDev(@Body(ValidationPipe) newDev : NewDevelopperDTO) : Promise<DevelopperDTO>
  {
    return this._devService.createDev(newDev);
  }
}
