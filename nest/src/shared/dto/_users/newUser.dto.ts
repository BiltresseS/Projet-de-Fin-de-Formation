import { IsDefined, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export class NewUserDTO {
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

    avatar : string
}