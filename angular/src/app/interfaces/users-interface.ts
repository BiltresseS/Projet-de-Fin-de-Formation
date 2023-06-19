export interface UserInterface {
    id : number,
    avatar : string
    login : string
    mail : string
    bio : string
    rank : RanksInterface

    token? : string
}

export interface UserSmollInterface {
    id : number
    avatar : string
    login : string
    rank : RanksInterface
}

export interface NewUserInterface {
    login : string
    mail : string
    mdp : string
}

export interface RanksInterface {
    id : number
    rank : string
}
