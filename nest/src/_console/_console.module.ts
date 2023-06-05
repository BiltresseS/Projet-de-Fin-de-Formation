import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleController } from './_console.controller';
import { ConsolesService } from './_console.service';
import { ConsolesEntity } from 'src/shared/entities/console.entity';

@Module({
  controllers: [ConsoleController],
  providers: [ConsolesService],
  imports : [
    TypeOrmModule.forFeature([
        ConsolesEntity
    ])
]
})
export class ConsoleModule {}
