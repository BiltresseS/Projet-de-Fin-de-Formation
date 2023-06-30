import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryController } from './_gallery.controller';
import { GalleryService } from './_gallery.service';
import { GalleryEntity } from 'src/shared/entities/gallery.entity';

@Module({
  controllers: [GalleryController],
  providers: [GalleryService],
  imports : [
    TypeOrmModule.forFeature([
        GalleryEntity
    ])
]
})
export class GalleryModule {}
