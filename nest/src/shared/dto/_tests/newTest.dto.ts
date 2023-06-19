import { IsDefined, IsNumber, IsString, Max, MaxLength, Min } from "class-validator"
import { DeveloppersEntity } from "src/shared/entities/developpers.entity"
import { DistributersEntity } from "src/shared/entities/distributers.entity"
import { GalleryEntity } from "src/shared/entities/gallery.entity"
import { UsersEntity } from "src/shared/entities/user.entity"
import { LifetimeEntity } from "src/shared/entities/lifetime.entity"
import { ConsoleDTO } from "../_consoles/consoles.dto"
import { GenresDTO } from "../_genres/genres.dto"

export class NewTestDTO extends LifetimeEntity {
    id : number

    @IsDefined()
    @IsString()
    @MaxLength(64)
    title : string

    @IsDefined()
    @IsString()
    @MaxLength(256)
    cover : string

    consoles : ConsoleDTO[]

    genres : GenresDTO[]

    developpeur : DeveloppersEntity
    
    distributer : DistributersEntity

    @IsDefined()
    @IsString()
    dateSortieJAP : string

    @IsDefined()
    @IsString()
    dateSortieUS : string

    @IsDefined()
    @IsString()
    dateSortiePAL : string

    @IsDefined()
    @IsString()
    @MaxLength(2048)
    resume : string

    @IsDefined()
    @IsString()
    @MaxLength(8192)
    test : string

    @IsDefined()
    @IsNumber()
    @Min(0)
    @Max(20)
    note : number

    author : UsersEntity
    
    gallery : GalleryEntity[]
}