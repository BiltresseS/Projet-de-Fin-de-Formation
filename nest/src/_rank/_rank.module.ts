import { Module } from '@nestjs/common';
import { RankService } from './_rank.service';
import { RankController } from './_rank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RanksEntity } from 'src/shared/entities/rank.entity';

@Module({
  controllers: [RankController],
  providers: [RankService],
  imports : [
    TypeOrmModule.forFeature([
        RanksEntity
    ])
]
})
export class RankModule {}
