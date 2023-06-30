import { Expose } from "class-transformer"
import { RanksEntity } from "src/shared/entities/rank.entity"

export class AffichageUserDTO {
    constructor() {}

    @Expose()
    id : number

    @Expose()
    avatar : string

    @Expose()
    login : string

    @Expose()
    mail : string

    @Expose()
    bio : string

    rank : RanksEntity

    deletedAt : Date
}

export class AffichageNewUserDTO {
    constructor() {}

    @Expose()
    id : number

    @Expose()
    login : string

    @Expose()
    mail : string
}

export class AffichageUserSmollDTO {
    constructor() {}

    deletedAt : boolean

    @Expose()
    avatar : string

    @Expose()
    login : string

    rank : string
}