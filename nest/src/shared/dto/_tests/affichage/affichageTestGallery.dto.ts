import { Expose } from "class-transformer"

export class AffichageTestGalleryDTO {
    
    @Expose()
    file : string
    
    @Expose()
    commentaire : string
}