import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AffichageTestDTO } from 'src/shared/dto/_tests/affichage/affichageTest.dto';
import { NewTestDTO } from 'src/shared/dto/_tests/newTest.dto';
import { TestId } from 'src/shared/dto/_tests/testId.dto';
import { UpdatedWholeTest } from 'src/shared/dto/_tests/updatedWholeTest.dto';
import { ConsolesEntity } from 'src/shared/entities/console.entity';
import { GenresEntity } from 'src/shared/entities/genres.entity';
import { TestsEntity } from 'src/shared/entities/test.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestsEntity) private testRepo : Repository<TestsEntity>
    , @InjectRepository(NewTestDTO) private newTestRepo : Repository<NewTestDTO>
    , @InjectRepository(ConsolesEntity) private readonly consolesRepo: Repository<ConsolesEntity>
    , @InjectRepository(GenresEntity) private readonly genresRepo: Repository<GenresEntity>
  ){}

  async getAll(): Promise<AffichageTestDTO[]> {
    let tests = await this.testRepo.find({
      relations : {
        consoles : true
        , genres : true
        , developpeur : true
        , distributer : true
        , author : true
        , upVotes : true
        , gallery : true
      }
    }).catch(_ => {throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND)})
  
    let formattedTests: AffichageTestDTO[] = tests.map((test) => ({
      id: test.id
      , title: test.title
      , cover: test.cover
      , consoles: test.consoles.map((console) => console.name)
      , genres: test.genres.map((genre) => genre.name)
      , developpeur: test.developpeur?.name
      , distributer: test.distributer?.name
      , dateSortieJAP: test.dateSortieJAP
      , dateSortieUS: test.dateSortieUS
      , dateSortiePAL: test.dateSortiePAL
      , resume: test.resume
      , test: test.test
      , note: test.note
      , author: test.author?.login
      , upVotes: test.upVotes.map((vote) => vote.login)
      , gallery: test.gallery.map((gallery) => ({url : gallery.url, commentaire : gallery.commentaire}))
    }));
  
    return formattedTests;
  }
  
  async getAllByConsole(consoleId : number) : Promise<AffichageTestDTO[]> {
    let listIdTest = await this.testRepo.find({
      select : { id : true },
      where : {consoles : {id : consoleId}}
    }).catch(_ => {throw new HttpException("Erreur lors de l'encodage de l'Id de la console", HttpStatus.NOT_FOUND)})

    let tests = await this.testRepo.find({
      where : { id : In(listIdTest.map(cls => cls.id)) },
      relations : {
        consoles : true
        , genres : true
        , developpeur : true
        , distributer : true
        , author : true
        , upVotes : true
        , gallery : true
      }
    }).catch(_ => {throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND)})

    let formattedTests: AffichageTestDTO[] = tests.map((test) => ({
      id: test.id
      , title: test.title
      , cover: test.cover
      , consoles: test.consoles.map((console) => console.name)
      , genres: test.genres.map((genre) => genre.name)
      , developpeur: test.developpeur.name
      , distributer: test.distributer.name
      , dateSortieJAP: test.dateSortieJAP
      , dateSortieUS: test.dateSortieUS
      , dateSortiePAL: test.dateSortiePAL
      , resume: test.resume
      , test: test.test
      , note: test.note
      , author: test.author.login
      , upVotes: test.upVotes.map((vote) => vote.login)
      , gallery: test.gallery.map((gallery) => ({url : gallery.url, commentaire : gallery.commentaire}))
    }));
  
    return formattedTests;
  }
  
  async getAllByGenre(genreId: number) : Promise<AffichageTestDTO[]> {
    let listIdTest = await this.testRepo.find({
      select : { id : true },
      where : {genres : {id : genreId}}
    }).catch(_ => {throw new HttpException("Erreur lors de l'encodage de l'Id du genre", HttpStatus.NOT_FOUND)})

    let tests = await this.testRepo.find({
      where : { id : In(listIdTest.map(cls => cls.id)) },
      relations : {
        consoles : true
        , genres : true
        , developpeur : true
        , distributer : true
        , author : true
        , upVotes : true
        , gallery : true
      }
    }).catch(_ => {throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND)})
    
    let formattedTests: AffichageTestDTO[] = tests.map((test) => ({
      id: test.id
      , title: test.title
      , cover: test.cover
      , consoles: test.consoles.map((console) => console.name)
      , genres: test.genres.map((genre) => genre.name)
      , developpeur: test.developpeur.name
      , distributer: test.distributer.name
      , dateSortieJAP: test.dateSortieJAP
      , dateSortieUS: test.dateSortieUS
      , dateSortiePAL: test.dateSortiePAL
      , resume: test.resume
      , test: test.test
      , note: test.note
      , author: test.author.login
      , upVotes: test.upVotes.map((vote) => vote.login)
      , gallery: test.gallery.map((gallery) => ({url : gallery.url, commentaire : gallery.commentaire}))
    }));
  
    return formattedTests;
  }

  async getAllByAuthor(authorId: number) : Promise<AffichageTestDTO[]> {
    let listIdTest = await this.testRepo.find({
      select : { id : true },
      where : {author : {id : authorId}}
    }).catch(_ => {throw new HttpException("Erreur lors de l'encodage de l'Id de l'utilisateur", HttpStatus.NOT_FOUND)})

    let tests = await this.testRepo.find({
      where : { id : In(listIdTest.map(cls => cls.id)) },
      relations : {
        consoles : true
        , genres : true
        , developpeur : true
        , distributer : true
        , author : true
        , upVotes : true
        , gallery : true
      }
    }).catch(_ => {throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND)})
    
    let formattedTests: AffichageTestDTO[] = tests.map((test) => ({
      id: test.id
      , title: test.title
      , cover: test.cover
      , consoles: test.consoles.map((console) => console.name)
      , genres: test.genres.map((genre) => genre.name)
      , developpeur: test.developpeur.name
      , distributer: test.distributer.name
      , dateSortieJAP: test.dateSortieJAP
      , dateSortieUS: test.dateSortieUS
      , dateSortiePAL: test.dateSortiePAL
      , resume: test.resume
      , test: test.test
      , note: test.note
      , author: test.author.login
      , upVotes: test.upVotes.map((vote) => vote.login)
      , gallery: test.gallery.map((gallery) => ({url : gallery.url, commentaire : gallery.commentaire}))
    }));
  
    return formattedTests;
  }
  
  async getOne(testId: number): Promise<AffichageTestDTO> {
    let test = await this.testRepo.findOne({
      where : { id : testId },
      relations : {
        consoles : true
        , genres : true
        , developpeur : true
        , distributer : true
        , author : true
        , upVotes : true
        , gallery : true
      }
    }).catch(_ => {throw new HttpException("Erreur lors de l'encodage de l'Id du test", HttpStatus.NOT_FOUND)});
    
    let formattedTest: AffichageTestDTO = {
      id: test.id
      , title: test.title
      , cover: test.cover
      , consoles: test.consoles.map((console) => console.name)
      , genres: test.genres.map((genre) => genre.name)
      , developpeur: test.developpeur.name
      , distributer: test.distributer.name
      , dateSortieJAP: test.dateSortieJAP
      , dateSortieUS: test.dateSortieUS
      , dateSortiePAL: test.dateSortiePAL
      , resume: test.resume
      , test: test.test
      , note: test.note
      , author: test.author.login
      , upVotes: test.upVotes.map((vote) => vote.login)
      , gallery: test.gallery.map((gallery) => ({url : gallery.url, commentaire : gallery.commentaire}))
    };
  
    return formattedTest;
  }

  async createTest(newTest: NewTestDTO): Promise<AffichageTestDTO>
  {
    let idConsole : number[] = []
    let idGenre : number[] = []
    idConsole = newTest.consoles.map((cls) => {
      return cls.id
    })//.catch(_ => {throw new HttpException("Erreur lors de l'encodage de l'Id de la console", HttpStatus.NOT_FOUND)})
    idGenre = newTest.genres.map((cls) => {
      return cls.id
    })//.catch(_ => {throw new HttpException("Erreur lors de l'encodage de l'Id du genre", HttpStatus.NOT_FOUND)})

    let testEntityCreated = this.testRepo.create({ ...newTest })
    let consoleLinked = await this.consolesRepo.find({where : { id : In(idConsole) }})
    let genreLinked = await this.genresRepo.find({where : {id : In(idGenre)}})
    testEntityCreated.consoles = []
    testEntityCreated.genres = []
    testEntityCreated.upVotes = []
    testEntityCreated.consoles = consoleLinked
    testEntityCreated.genres = genreLinked

    let test = await this.testRepo.save(testEntityCreated).catch(_ => {throw new HttpException("Erreur inconnue (mais plutôt grave) lors de l'enregistrement", HttpStatus.FORBIDDEN)})

    let formattedTest: AffichageTestDTO = {
      id: test.id
      , title: test.title
      , cover: test.cover
      , consoles: test.consoles.map((console) => console.name)
      , genres: test.genres.map((genre) => genre.name)
      , developpeur: test.developpeur.name
      , distributer: test.distributer.name
      , dateSortieJAP: test.dateSortieJAP
      , dateSortieUS: test.dateSortieUS
      , dateSortiePAL: test.dateSortiePAL
      , resume: test.resume
      , test: test.test
      , note: test.note
      , author: test.author.login
      , upVotes: test.upVotes.map((vote) => vote.login)
      , gallery: test.gallery.map((gallery) => ({url : gallery.url, commentaire : gallery.commentaire}))
    };

    return formattedTest
  }

  async updateTest(testId: number, updatedTest: UpdatedWholeTest) : Promise<AffichageTestDTO>
  {
    let testExist = await this.testRepo.findOneOrFail({where : {id : testId}}).catch(_ => {throw new HttpException("Erreur lors de l'encodage de l'Id du test", HttpStatus.NOT_FOUND)})

    testExist.title = updatedTest.title
    , testExist.cover = updatedTest.cover
    , testExist.consoles = updatedTest.consoles
    , testExist.genres = updatedTest.genres
    , testExist.developpeur = updatedTest.developpeur
    , testExist.distributer = updatedTest.distributer
    , testExist.dateSortieJAP = updatedTest.dateSortieJAP
    , testExist.dateSortieUS = updatedTest.dateSortieUS
    , testExist.dateSortiePAL = updatedTest.dateSortiePAL
    , testExist.resume = updatedTest.resume
    , testExist.test = updatedTest.test
    , testExist.note = updatedTest.note
    , testExist.upVotes = updatedTest.upVotes
    , testExist.gallery = updatedTest.gallery

    let testSaved = await this.testRepo.save(testExist).catch(_ => {throw new HttpException("Erreur inconnue (mais plutôt grave) lors de l'enregistrement", HttpStatus.NOT_FOUND)})

    let formattedTest: AffichageTestDTO = {
      id: testSaved.id
      , title: testSaved.title
      , cover: testSaved.cover
      , consoles: testSaved.consoles.map((console) => console.name)
      , genres: testSaved.genres.map((genre) => genre.name)
      , developpeur: testSaved.developpeur.name
      , distributer: testSaved.distributer.name
      , dateSortieJAP: testSaved.dateSortieJAP
      , dateSortieUS: testSaved.dateSortieUS
      , dateSortiePAL: testSaved.dateSortiePAL
      , resume: testSaved.resume
      , test: testSaved.test
      , note: testSaved.note
      , author: testSaved.author.login
      , upVotes: testSaved.upVotes.map((vote) => vote.login)
      , gallery: testSaved.gallery.map((gallery) => ({url : gallery.url, commentaire : gallery.commentaire}))
    };

    return formattedTest
  }

  async disableTest(testId: number) : Promise<TestId> 
  {
    let testExist = await this.testRepo.findOneOrFail({where : {id : testId}}).catch(_ => {throw new HttpException("Erreur lors de l'encodage de l'Id du test", HttpStatus.NOT_FOUND)})

    let result = await this.testRepo.softRemove(testExist)

    return 1
  }
}