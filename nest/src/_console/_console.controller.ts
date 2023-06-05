import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, ValidationPipe, Put } from '@nestjs/common';
import { ConsolesService } from './_console.service';
import { ConsoleDTO } from 'src/shared/dto/_consoles/consoles.dto';

@Controller('api/consoles')
export class ConsoleController {
  constructor(private readonly consoleService: ConsolesService) {}

  @Get()
  getAll() : Promise<ConsoleDTO[]>
  {
    return this.consoleService.getAll();
  }
}
