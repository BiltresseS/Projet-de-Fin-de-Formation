import { Expose } from "class-transformer"
import { AffichageTestGalleryDTO } from "./affichageTestGallery.dto"

export class AffichageTestDTO {
    constructor() {}

    @Expose()
    id : number

    @Expose()
    title : string

    @Expose()
    cover : string

    @Expose()
    consoles : string[]

    @Expose()
    genres : string[]

    @Expose()
    developpeur : string
   
    @Expose()
    distributer : string

    @Expose()
    dateSortieJAP : string

    @Expose()
    dateSortieUS : string

    @Expose()
    dateSortiePAL : string

    @Expose()
    resume : string

    @Expose()
    test : string

    @Expose()
    note : number

    @Expose()
    author : string
    @Expose()
    upVotes : string[]

    @Expose()
    gallery : AffichageTestGalleryDTO[]
}