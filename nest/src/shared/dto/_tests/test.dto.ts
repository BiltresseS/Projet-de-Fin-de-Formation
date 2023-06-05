import { IsDefined } from "class-validator"
import { ConsolesEntity } from "src/shared/entities/console.entity"
import { DeveloppersEntity } from "src/shared/entities/developpers.entity"
import { DistributersEntity } from "src/shared/entities/distributers.entity"
import { GalleryEntity } from "src/shared/entities/gallery.entity"
import { GenresEntity } from "src/shared/entities/genres.entity"
import { UsersEntity } from "src/shared/entities/user.entity"

export class Test {
    constructor() {}

    @IsDefined()
    id : number

    @IsDefined()
    title : string

    @IsDefined()
    cover : string

    consoles : ConsolesEntity[]

    genres : GenresEntity[]

    developpeur : DeveloppersEntity
    
    distributer : DistributersEntity

    @IsDefined()
    dateSortieJAP : string

    @IsDefined()
    dateSortieUS : string

    @IsDefined()
    dateSortiePAL : string

    @IsDefined()
    resume : string

    @IsDefined()
    test : string

    @IsDefined()
    note : number

    author : UsersEntity
    
    upVotes : UsersEntity[]
    
    gallery : GalleryEntity[]
}