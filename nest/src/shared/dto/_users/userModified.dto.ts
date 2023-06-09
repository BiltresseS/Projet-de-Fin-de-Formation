import { IsDefined } from "class-validator"
import { UserRank } from "./userRank.dto"
import { Test } from "../_tests/test.dto"

export class UserModified {
    constructor() {}

    @IsDefined()
    id : number

    @IsDefined()
    avatar : string
    
    @IsDefined()
    login : string
    
    @IsDefined()
    mail : string
    
    @IsDefined()
    mdp : string

    nmdp : string
    
    @IsDefined()
    bio : string
    
    rank : UserRank

    tests : Test[]

    testsUpVotes : Test[]
}