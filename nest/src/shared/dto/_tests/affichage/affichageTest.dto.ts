import { Expose } from "class-transformer"
import { AffichageTestGalleryDTO } from "./affichageTestGallery.dto"
import { UpVoteEntity } from "src/shared/entities/up-vote.entity"
import { ConsolesEntity } from "src/shared/entities/console.entity"
import { GenresEntity } from "src/shared/entities/genres.entity"
import { DeveloppersEntity } from "src/shared/entities/developpers.entity"
import { DistributersEntity } from "src/shared/entities/distributers.entity"
import { ConsoleDTO } from "../../_consoles/consoles.dto"
import { GenresDTO } from "../../_genres/genres.dto"
import { DevelopperDTO } from "../developper.dto"
import { DistributerDTO } from "../distributer.dto"

export class AffichageTestDTO {
    constructor() {}

    @Expose()
    id : number

    @Expose()
    title : string

    @Expose()
    cover : string

    @Expose()
    consoles : ConsoleDTO[]

    @Expose()
    genres : GenresDTO[]

    @Expose()
    developpeur : DevelopperDTO
   
    @Expose()
    distributeur : DistributerDTO

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
    upVotes : UpVoteEntity[]

    @Expose()
    gallery : AffichageTestGalleryDTO[]
}