export interface UserInterface {
    avatar : string
    login : string
    mail : string
    bio : string
    rank : RanksInterface
}

export interface UserSmollInterface {
    id : number
    avatar : string
    login : string
    rank : RanksInterface
}

export interface RanksInterface {
    name : string
}
