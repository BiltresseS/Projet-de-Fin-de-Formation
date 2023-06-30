import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevelopperController } from './_developper.controller';
import { DevelopperService } from './_developper.service';
import { DeveloppersEntity } from 'src/shared/entities/developpers.entity';

@Module({
  controllers: [DevelopperController],
  providers: [DevelopperService],
  imports : [
    TypeOrmModule.forFeature([
        DeveloppersEntity
    ])
]
})
export class DeveloppersModule {}
