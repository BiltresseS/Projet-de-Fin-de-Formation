import { Expose } from "class-transformer"
import { UserRank } from "../userRank.dto"

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

    rank : UserRank
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

    @Expose()
    avatar : string

    @Expose()
    login : string

    rank : string
}