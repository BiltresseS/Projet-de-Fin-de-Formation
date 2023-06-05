import { IsDefined } from "class-validator"
import { Test } from "../_tests/test.dto"

export class NewGenre{

    @IsDefined()
    name : string
    
    tests : Test[]
}