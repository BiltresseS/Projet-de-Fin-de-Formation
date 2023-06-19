import { IsDefined } from "class-validator";
import { User } from "./user.dto";

export class UserRank{
    @IsDefined()
    id : number
    
    @IsDefined()
    rank : string

    users : User[]
}