import { IsDefined } from "class-validator";
import { User } from "./user.dto";
import { LifetimeEntity } from "src/shared/entities/lifetime.entity";

export class UserRank{
    @IsDefined()
    id : number
    
    @IsDefined()
    rank : string

    users : User[]
}