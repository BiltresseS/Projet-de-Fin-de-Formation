import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { GenresDTO } from 'src/shared/dto/_genres/genres.dto';
import { GalleryService } from './_gallery.service';
import { GalleryDTO } from 'src/shared/dto/_gallery/gallery.dto';

@Controller('api/gallery')
export class GalleryController {
  constructor(private readonly _galleryService: GalleryService) {}

  @Get()
  getAll() : Promise<GalleryDTO[]>
  {
    return this._galleryService.getAll();
  }

  @Get('image/:id')
    async getImage(
        @Param('id') id: number
    ) {
        const image = await this._galleryService.getImage(id);
        return new StreamableFile(Buffer.from(image, "base64"), { type: 'image/jpeg' })
    }
}
