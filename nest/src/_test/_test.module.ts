import { Module } from '@nestjs/common';
import { TestService } from './_test.service';
import { TestController } from './_test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/shared/entities/user.entity';
import { ConsolesEntity } from 'src/shared/entities/console.entity';
import { GenresEntity } from 'src/shared/entities/genres.entity';
import { GalleryEntity } from 'src/shared/entities/gallery.entity';
import { NewTestDTO } from 'src/shared/dto/_tests/newTest.dto';
import { TestEntity } from 'src/shared/entities/test.entity';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports : [
    TypeOrmModule.forFeature([
        TestEntity
        , UsersEntity
        , ConsolesEntity
        , GenresEntity
        , GalleryEntity
        , NewTestDTO
    ])
]
})
export class TestModule {}
