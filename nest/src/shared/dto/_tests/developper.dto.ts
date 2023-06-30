import { IsDefined } from "class-validator"

export class DevelopperDTO {
    constructor(id? : number, name? : string) {
        this.id = id
        this.name = name
    }

    @IsDefined()
    id : number

    @IsDefined()
    name : string
}

export class NewDevelopperDTO {
    constructor() {}

    @IsDefined()
    name : string
}