import { Expose } from "class-transformer"

export class AffichageTestGalleryDTO {
    
    @Expose()
    url : string
    
    @Expose()
    commentaire : string
}