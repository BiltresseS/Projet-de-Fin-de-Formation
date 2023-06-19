import { IsDefined } from "class-validator"
import { Test } from "../_tests/test.dto"

export class NewGenreDTO{

    @IsDefined()
    name : string
    
    tests : Test[]
}