import { IsDefined } from "class-validator"

export class DistributerDTO {
    constructor(id? : number, name? : string) {
        this.id = id
        this.name = name
    }

    @IsDefined()
    id : number

    @IsDefined()
    name : string
}

export class NewDistributerDTO {
    constructor() {}

    @IsDefined()
    name : string
}