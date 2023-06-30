import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, ValidationPipe, Put, StreamableFile } from '@nestjs/common';
import { TestService } from './_test.service';
import { UpdatedWholeTest } from 'src/shared/dto/_tests/updatedWholeTest.dto';
import { AffichageTestDTO } from 'src/shared/dto/_tests/affichage/affichageTest.dto';
import { NewTestDTO } from 'src/shared/dto/_tests/newTest.dto';

@Controller('api/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  findAll() : Promise<AffichageTestDTO[]>
  {
    return this.testService.getAll();
  }

  @Get('console/:consoleId')
  findAllByConsole(@Param('consoleId', ParseIntPipe) consoleId: number) : Promise<AffichageTestDTO[]>
  {
    return this.testService.getAllByConsole(consoleId)
  }
  
  @Get('genre/:genreId')
  findAllByGenre(@Param('genreId', ParseIntPipe) genreId: number) : Promise<AffichageTestDTO[]>
  {
    return this.testService.getAllByGenre(genreId)
  }

  @Get('author/:authorId')
  findAllByAuthor(@Param('authorId', ParseIntPipe) authorId: number) : Promise<AffichageTestDTO[]>
  {
    return this.testService.getAllByAuthor(authorId)
  }

  @Get(':testId')
  findOne(@Param('testId', ParseIntPipe) testId: number) : Promise<AffichageTestDTO>
  {
    return this.testService.getOne(testId)
  }

  @Get('image/:id')
    async getImage(
        @Param('id') id: number
    ) {
        const image = await this.testService.getImage(id);
        return new StreamableFile(Buffer.from(image, "base64"), { type: 'image/jpeg' })
    }

  @Post()
  createTest(@Body() newTest : NewTestDTO) : Promise<AffichageTestDTO>
  {
    return this.testService.createTest(newTest);
  }

  @Put(':id')
  update(@Param('id') testId : number, @Body() updateTestDto: UpdatedWholeTest) : Promise<AffichageTestDTO>
  {
    return this.testService.updateTest(testId, updateTestDto);
  }

  @Delete(':id')
  disableTest(@Param('id') testId: number) {
    return this.testService.disableTest(testId);
  }
}
