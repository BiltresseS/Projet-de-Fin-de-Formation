import { IsDefined, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"
import { UserRank } from "./userRank.dto"
import { Test } from "../_tests/test.dto"

export class NewUser {
    id : number

    @IsDefined()
    @IsString()
    @MaxLength(128)
    avatar : string

    @IsDefined()
    @IsString()
    @MinLength(2)
    @MaxLength(16)
    login : string

    @IsDefined()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    mail : string

    @IsDefined()
    @IsStrongPassword({
        minLength : 8,
        minLowercase : 1,
        minUppercase : 1,
        minNumbers : 1
    })
    mdp : string

    @IsDefined()
    @IsString()
    @MinLength(10)
    @MaxLength(1024)
    bio : string

    rank : UserRank
}