import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistributerController } from './_distributer.controller';
import { DistributerService } from './_distributer.service';
import { DistributersEntity } from 'src/shared/entities/distributers.entity';

@Module({
  controllers: [DistributerController],
  providers: [DistributerService],
  imports : [
    TypeOrmModule.forFeature([
        DistributersEntity
    ])
]
})
export class DistributersModule {}
