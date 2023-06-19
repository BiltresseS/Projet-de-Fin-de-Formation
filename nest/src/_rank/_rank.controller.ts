import { Controller, Get } from '@nestjs/common';
import { RankService } from './_rank.service';
import { UserRank } from 'src/shared/dto/_users/userRank.dto';

@Controller('api/ranks')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get()
  getAll() : Promise<UserRank[]>
  {
    return this.rankService.getAll();
  }
}
