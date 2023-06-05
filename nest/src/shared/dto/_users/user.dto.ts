import { IsDefined } from "class-validator"
import { UserRank } from "./userRank.dto"
import { Test } from "../_tests/test.dto"

export class User {
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
    
    @IsDefined()
    bio : string
    
    rank : UserRank

    tests : Test[]

    testsUpVotes : Test[]
}