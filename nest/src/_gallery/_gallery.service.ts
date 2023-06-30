import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GalleryDTO } from "src/shared/dto/_gallery/gallery.dto";
import { GalleryEntity } from "src/shared/entities/gallery.entity";
import { Repository } from "typeorm";

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryEntity) private _galleryRepo: Repository<GalleryEntity>
  ) { }

  async getAll(): Promise<GalleryDTO[]> {
    const defaultAvatarBase64 = Buffer.from('/default.png').toString('base64');

    let gallery = await this._galleryRepo.find().catch(_ => { throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND) })

    let formattedGallery: GalleryDTO[] = gallery.map((gallery) => ({
      id: gallery.id
      , test: gallery.test
      , file: gallery.file === defaultAvatarBase64 ? null : 'http://localhost:5000/api/gallery/image/' + gallery.id
      , commentaire: gallery.commentaire
      , uploader: gallery.uploader
    }));

    return formattedGallery
  }

  async getImage(imageId: number): Promise<string> {
    let image = await this._galleryRepo.findOne({
      where: { id: imageId }
    }).catch(() => { throw new HttpException("Erreur lors de l'encodage de l'Id de l'utilisateur", HttpStatus.NOT_FOUND) })

    return image.file
  }
}