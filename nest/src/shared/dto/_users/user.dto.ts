import { IsDefined } from "class-validator"
import { UserRank } from "./userRank.dto"
import { Test } from "../_tests/test.dto"
import { UsersEntity } from "src/shared/entities/user.entity";

export class User {
    constructor(
        user: UsersEntity
    ) {
        this.avatar = 'http://localhost:5000/api/users/image/' + user.id;
        this.login = user.login;
    }

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