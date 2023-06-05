import { ConsoleInterface } from "./consoles-interface"

export interface TestInterface {
    title : string
    cover : string
    consoles : ConsoleInterface[]
    genres : GenreInterface[]
    developpeur : string
    distributeur : string
    dateSortieJAP : string
    dateSortieUS : string
    dateSortiePAL : string
    resume : string
    test : string
    note : number
    author : string
    upVotes : upVotesInterface[]
    gallery : galleryInterface[]
}

export interface TestPreviewInterface {
    id : number
    title : string
    cover : string
    consoles : ConsoleInterface[]
    genres : GenreInterface[]
    resume : string
    note : number
    author : string
    upVotes : upVotesInterface[]
}

export interface TestPreviewSmollInterface {
    title : string
    cover : string
    note : number
}

export interface GenreInterface {
    id : number
    name : string
}

export interface upVotesInterface {
    avatar : string
    login : string
}

export interface galleryInterface {
    url : string
    commentaire : string
}