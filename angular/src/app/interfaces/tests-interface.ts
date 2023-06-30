export interface TestInterface {
    id : number
    title : string
    cover : string
    consoles : ConsoleInterface[]
    genres : GenreInterface[]
    developpeur : DevelopperInterface
    distributeur : DistributerInterface
    dateSortieJAP : string
    dateSortieUS : string
    dateSortiePAL : string
    resume : string
    test : string
    note : number
    author : string
    upVotes : UpVotesInterface[]
    gallery : GalleryInterface[]
}

export interface NewTestInterface {
    title : string
    cover : string
    consoles : ConsoleInterface[]
    genres : GenreInterface[]
    developpeur : number
    distributeur : number
    dateSortieJAP : string
    dateSortieUS : string
    dateSortiePAL : string
    resume : string
    test : string
    note : number
    author : string
    gallery : GalleryInterface[]
}

export interface SubmitNewTestInterface {
    title : string
    cover : string
    consoles : ConsoleInterface[]
    genres : GenreInterface[]
    developpeur : DevelopperInterface | undefined
    distributeur : DistributerInterface | undefined
    dateSortieJAP : string
    dateSortieUS : string
    dateSortiePAL : string
    resume : string
    test : string
    note : number
    author : string
    gallery : GalleryInterface[]
}

export interface SubmitReturnNewTestInterface {
    title : string
    cover : string
    consoles : ConsoleInterface[]
    genres : GenreInterface[]
    developpeur : DevelopperInterface
    distributeur : DistributerInterface
    dateSortieJAP : string
    dateSortieUS : string
    dateSortiePAL : string
    resume : string
    test : string
    note : number
    author : string
    gallery : GalleryInterface[]
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
    upVotes : UpVotesInterface[]
}

export interface TestPreviewSmollInterface {
    title : string
    cover : string
    note : number
}

export interface ConsoleInterface {
    id : number
    name : string
}

export interface GenreInterface {
    id : number
    name : string
}

export interface DevelopperInterface {
    id : number
    name : string
}

export interface NewDevelopperInterface {
    name : string
}

export interface DistributerInterface {
    id : number
    name : string
}

export interface NewDistributerInterface {
    name : string
}

export interface UpVotesInterface {
    avatar : string
    login : string
}

export interface GalleryInterface {
    file : string
    commentaire : string
    uploader : string
}