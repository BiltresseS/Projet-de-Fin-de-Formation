import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AffichageTestDTO } from 'src/shared/dto/_tests/affichage/affichageTest.dto';
import { DevelopperDTO } from 'src/shared/dto/_tests/developper.dto';
import { DistributerDTO } from 'src/shared/dto/_tests/distributer.dto';
import { NewTestDTO } from 'src/shared/dto/_tests/newTest.dto';
import { TestId } from 'src/shared/dto/_tests/testId.dto';
import { UpdatedWholeTest } from 'src/shared/dto/_tests/updatedWholeTest.dto';
import { ConsolesEntity } from 'src/shared/entities/console.entity';
import { DeveloppersEntity } from 'src/shared/entities/developpers.entity';
import { DistributersEntity } from 'src/shared/entities/distributers.entity';
import { GenresEntity } from 'src/shared/entities/genres.entity';
import { TestEntity } from 'src/shared/entities/test.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity) private testRepo: Repository<TestEntity>
    , @InjectRepository(ConsolesEntity) private readonly consolesRepo: Repository<ConsolesEntity>
    , @InjectRepository(GenresEntity) private readonly genresRepo: Repository<GenresEntity>
  ) { }

  async getAll(): Promise<AffichageTestDTO[]> {
    const defaultAvatarBase64 = Buffer.from('/default.png').toString('base64');

    let tests = await this.testRepo.find({
      relations: {
        consoles: true
        , genres: true
        , developpeur: true
        , distributeur: true
        , upVotes: true
        , gallery: true
      }
    }).catch(_ => { throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND) })

    let formattedTests: AffichageTestDTO[] = tests.map((test) => ({
      id: test.id
      , title: test.title
      , cover: test.cover === defaultAvatarBase64 ? null : 'http://localhost:5000/api/test/image/' + test.id
      , consoles: test.consoles.map((console) => ({
        id : console.id
        , name : console.name
      }))
      , genres: test.genres.map((genre) => ({
        id: genre.id
        , name: genre.name
      }))
      , developpeur: new DevelopperDTO(test.developpeur.id, test.developpeur.name)
      , distributeur:  new DistributerDTO(test.distributeur.id, test.distributeur.name)
      , dateSortieJAP: test.dateSortieJAP
      , dateSortieUS: test.dateSortieUS
      , dateSortiePAL: test.dateSortiePAL
      , resume: test.resume
      , test: test.test
      , note: test.note
      , author: test.author
      , upVotes: test.upVotes
      , gallery: test.gallery.map((gallery) => ({
        file: gallery.file === defaultAvatarBase64 ? null : 'http://localhost:5000/api/gallery/image/' + gallery.id
        , commentaire: gallery.commentaire
      }))
    }));

    return formattedTests;
  }

  async getAllByConsole(consoleId: number): Promise<AffichageTestDTO[]> {
    const defaultAvatarBase64 = Buffer.from('/default.png').toString('base64');

    let listIdTest = await this.testRepo.find({
      select: { id: true },
      where: { consoles: { id: consoleId } }
    }).catch(_ => { throw new HttpException("Erreur lors de l'encodage de l'Id de la console", HttpStatus.NOT_FOUND) })

    let tests = await this.testRepo.find({
      where: { id: In(listIdTest.map(cls => cls.id)) },
      relations: {
        consoles: true
        , genres: true
        , developpeur: true
        , distributeur: true
        , upVotes: true
        , gallery: true
      }
    }).catch(_ => { throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND) })

    let formattedTests: AffichageTestDTO[] = tests.map((test) => ({
      id: test.id
      , title: test.title
      , cover: test.cover === defaultAvatarBase64 ? null : 'http://localhost:5000/api/test/image/' + test.id
      , consoles: test.consoles.map((console) => ({
        id : console.id
        , name : console.name
      }))
      , genres: test.genres.map((genre) => ({
        id: genre.id
        , name: genre.name
      }))
      , developpeur: new DevelopperDTO(test.developpeur.id, test.developpeur.name)
      , distributeur:  new DistributerDTO(test.distributeur.id, test.distributeur.name)
      , dateSortieJAP: test.dateSortieJAP
      , dateSortieUS: test.dateSortieUS
      , dateSortiePAL: test.dateSortiePAL
      , resume: test.resume
      , test: test.test
      , note: test.note
      , author: test.author
      , upVotes: test.upVotes
      , gallery: test.gallery.map((gallery) => ({
        file: gallery.file === defaultAvatarBase64 ? null : 'http://localhost:5000/api/gallery/image/' + gallery.id
        , commentaire: gallery.commentaire
      }))
    }));

    return formattedTests;
  }

  async getAllByGenre(genreId: number): Promise<AffichageTestDTO[]> {
    const defaultAvatarBase64 = Buffer.from('/default.png').toString('base64');

    let listIdTest = await this.testRepo.find({
      select: { id: true },
      where: { genres: { id: genreId } }
    }).catch(_ => { throw new HttpException("Erreur lors de l'encodage de l'Id du genre", HttpStatus.NOT_FOUND) })

    let tests = await this.testRepo.find({
      where: { id: In(listIdTest.map(cls => cls.id)) },
      relations: {
        consoles: true
        , genres: true
        , developpeur: true
        , distributeur: true
        , upVotes: true
        , gallery: true
      }
    }).catch(_ => { throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND) })

    let formattedTests: AffichageTestDTO[] = tests.map((test) => ({
      id: test.id
      , title: test.title
      , cover: test.cover === defaultAvatarBase64 ? null : 'http://localhost:5000/api/test/image/' + test.id
      , consoles: test.consoles.map((console) => ({
        id : console.id
        , name : console.name
      }))
      , genres: test.genres.map((genre) => ({
        id: genre.id
        , name: genre.name
      }))
      , developpeur: new DevelopperDTO(test.developpeur.id, test.developpeur.name)
      , distributeur:  new DistributerDTO(test.distributeur.id, test.distributeur.name)
      , dateSortieJAP: test.dateSortieJAP
      , dateSortieUS: test.dateSortieUS
      , dateSortiePAL: test.dateSortiePAL
      , resume: test.resume
      , test: test.test
      , note: test.note
      , author: test.author
      , upVotes: test.upVotes
      , gallery: test.gallery.map((gallery) => ({
        file: gallery.file === defaultAvatarBase64 ? null : 'http://localhost:5000/api/gallery/image/' + gallery.id
        , commentaire: gallery.commentaire
      }))
    }));

    return formattedTests;
  }

  async getAllByAuthor(authorId: number): Promise<AffichageTestDTO[]> {
    const defaultAvatarBase64 = Buffer.from('/default.png').toString('base64');

    const authorEndpoint = `localhost:5000/api/users/${authorId}`;
    let listIdTest = await this.testRepo.find({
      select: { id: true },
      where: { author: authorEndpoint }
    }).catch(_ => { throw new HttpException("Erreur lors de l'encodage de l'Id de l'utilisateur", HttpStatus.NOT_FOUND) })

    let tests = await this.testRepo.find({
      where: { id: In(listIdTest.map(cls => cls.id)) },
      relations: {
        consoles: true
        , genres: true
        , developpeur: true
        , distributeur: true
        , upVotes: true
        , gallery: true
      }
    }).catch(_ => { throw new HttpException("Erreur inconnue (mais plutôt grave) dans la base de données", HttpStatus.NOT_FOUND) })

    let formattedTests: AffichageTestDTO[] = tests.map((test) => ({
      id: test.id
      , title: test.title
      , cover: test.cover === defaultAvatarBase64 ? null : 'http://localhost:5000/api/test/image/' + test.id
      , consoles: test.consoles.map((console) => ({
        id : console.id
        , name : console.name
      }))
      , genres: test.genres.map((genre) => ({
        id: genre.id
        , name: genre.name
      }))
      , developpeur: new DevelopperDTO(test.developpeur.id, test.developpeur.name)
      , distributeur:  new DistributerDTO(test.distributeur.id, test.distributeur.name)
      , dateSortieJAP: test.dateSortieJAP
      , dateSortieUS: test.dateSortieUS
      , dateSortiePAL: test.dateSortiePAL
      , resume: test.resume
      , test: test.test
      , note: test.note
      , author: test.author
      , upVotes: test.upVotes
      , gallery: test.gallery.map((gallery) => ({
        file: gallery.file === defaultAvatarBase64 ? null : 'http://localhost:5000/api/gallery/image/' + gallery.id
        , commentaire: gallery.commentaire
      }))
    }));

    return formattedTests;
  }

  async getOne(testId: number): Promise<AffichageTestDTO> {
    const defaultAvatarBase64 = Buffer.from('/default.png').toString('base64');

    let test = await this.testRepo.findOne({
      where: { id: testId },
      relations: {
        consoles: true
        , genres: true
        , developpeur: true
        , distributeur: true
        , upVotes: true
        , gallery: true
      }
    }).catch(_ => { throw new HttpException("Erreur lors de l'encodage de l'Id du test", HttpStatus.NOT_FOUND) });

    // let developpeur = await this.devRepo.findOneOrFail({where : { id : test.developpeur.id}})
    // let distributeur = await this.distriRepo.findOneOrFail({where : { id : test.distributeur.id}})

    let formattedTest: AffichageTestDTO = {
      id: test.id
      , title: test.title
      , cover: test.cover === defaultAvatarBase64 ? null : 'http://localhost:5000/api/test/image/' + test.id
      , consoles: test.consoles.map((console) => ({
        id : console.id
        , name : console.name
      }))
      , genres: test.genres.map((genre) => ({
        id: genre.id
        , name: genre.name
      }))
      , developpeur: new DevelopperDTO(test.developpeur.id, test.developpeur.name)
      , distributeur:  new DistributerDTO(test.distributeur.id, test.distributeur.name)
      , dateSortieJAP: test.dateSortieJAP
      , dateSortieUS: test.dateSortieUS
      , dateSortiePAL: test.dateSortiePAL
      , resume: test.resume
      , test: test.test
      , note: test.note
      , author: test.author
      , upVotes: test.upVotes
      , gallery: test.gallery.map((gallery) => ({
        file: gallery.file === defaultAvatarBase64 ? null : 'http://localhost:5000/api/gallery/image/' + gallery.id
        , commentaire: gallery.commentaire
      }))
    };
    
    return formattedTest;
  }

  async getImage(testId: number): Promise<string> {
    let oneTest = await this.testRepo.findOne({
      where: { id: testId },
      relations: {
        consoles: true
        , genres: true
        , developpeur: true
        , distributeur: true
        , upVotes: true
      }
    }).catch(() => { throw new HttpException("Erreur lors de l'encodage de l'Id du test", HttpStatus.NOT_FOUND) })

    return oneTest.cover;
  }

  async createTest(newTest: NewTestDTO): Promise<AffichageTestDTO> {
    const defaultAvatarBase64 = Buffer.from('/default.png').toString('base64');

    let idConsole: number[] = []
    let idGenre: number[] = []
    idConsole = newTest.consoles.map((c) => { return c.id })
    idGenre = newTest.genres.map((g) => { return g.id })

    let testEntityCreated = this.testRepo.create({ ...newTest })
    let consoleLinked = await this.consolesRepo.find({ where: { id: In(idConsole) } })
    let genreLinked = await this.genresRepo.find({ where: { id: In(idGenre) } })
    testEntityCreated.upVotes = []
    testEntityCreated.consoles = consoleLinked
    testEntityCreated.genres = genreLinked

    let test = await this.testRepo.save(testEntityCreated).catch(_ => { throw new HttpException("Erreur inconnue (mais plutôt grave) lors de l'enregistrement", HttpStatus.FORBIDDEN) })

    let formattedTest: AffichageTestDTO = {
      id: test.id
      , title: test.title
      , cover: test.cover === defaultAvatarBase64 ? null : 'http://localhost:5000/api/test/image/' + test.id
      , consoles: test.consoles.map((console) => ({
        id : console.id
        , name : console.name
      }))
      , genres: test.genres.map((genre) => ({
        id: genre.id
        , name: genre.name
      }))
      , developpeur: new DevelopperDTO(test.developpeur.id, test.developpeur.name)
      , distributeur:  new DistributerDTO(test.distributeur.id, test.distributeur.name)
      , dateSortieJAP: test.dateSortieJAP
      , dateSortieUS: test.dateSortieUS
      , dateSortiePAL: test.dateSortiePAL
      , resume: test.resume
      , test: test.test
      , note: test.note
      , author: test.author
      , upVotes: test.upVotes
      , gallery: test.gallery.map((gallery) => ({
        file: gallery.file === defaultAvatarBase64 ? null : 'http://localhost:5000/api/gallery/image/' + gallery.id
        , commentaire: gallery.commentaire
      }))
    };

    return formattedTest
  }

  async updateTest(testId: number, updatedTest: UpdatedWholeTest): Promise<AffichageTestDTO> {
    const defaultAvatarBase64 = Buffer.from('/default.png').toString('base64');

    let testExist = await this.testRepo.findOneOrFail({ where: { id: testId } }).catch(_ => { throw new HttpException("Erreur lors de l'encodage de l'Id du test", HttpStatus.NOT_FOUND) })

    testExist.title = updatedTest.title
      , testExist.cover = updatedTest.cover
      , testExist.consoles = updatedTest.consoles
      , testExist.genres = updatedTest.genres
      , testExist.developpeur = updatedTest.developpeur
      , testExist.distributeur = updatedTest.distributeur
      , testExist.dateSortieJAP = updatedTest.dateSortieJAP
      , testExist.dateSortieUS = updatedTest.dateSortieUS
      , testExist.dateSortiePAL = updatedTest.dateSortiePAL
      , testExist.resume = updatedTest.resume
      , testExist.test = updatedTest.test
      , testExist.note = updatedTest.note
      , testExist.upVotes = updatedTest.upVotes
      , testExist.gallery = updatedTest.gallery

    let testSaved = await this.testRepo.save(testExist).catch(_ => { throw new HttpException("Erreur inconnue (mais plutôt grave) lors de l'enregistrement", HttpStatus.NOT_FOUND) })

    let formattedTest: AffichageTestDTO = {
      id: testSaved.id
      , title: testSaved.title
      , cover: testSaved.cover === defaultAvatarBase64 ? null : 'http://localhost:5000/api/test/image/' + testSaved.id
      , consoles: testSaved.consoles.map((console) => ({
        id : console.id
        , name : console.name
      }))
      , genres: testSaved.genres.map((genre) => ({
        id: genre.id
        , name: genre.name
      }))
      , developpeur: new DevelopperDTO(testExist.developpeur.id, testExist.developpeur.name)
      , distributeur:  new DistributerDTO(testExist.distributeur.id, testExist.distributeur.name)
      , dateSortieJAP: testSaved.dateSortieJAP
      , dateSortieUS: testSaved.dateSortieUS 
      , dateSortiePAL: testSaved.dateSortiePAL
      , resume: testSaved.resume
      , test: testSaved.test
      , note: testSaved.note
      , author: testSaved.author
      , upVotes: testSaved.upVotes
      , gallery: testSaved.gallery.map((gallery) => ({
        file: gallery.file === defaultAvatarBase64 ? null : 'http://localhost:5000/api/gallery/image/' + gallery.id
        , commentaire: gallery.commentaire
      }))
    };

    return formattedTest
  }

  async disableTest(testId: number): Promise<TestId> {
    let testExist = await this.testRepo.findOneOrFail({ where: { id: testId } }).catch(_ => { throw new HttpException("Erreur lors de l'encodage de l'Id du test", HttpStatus.NOT_FOUND) })

    let result = await this.testRepo.softRemove(testExist)

    return 1
  }
}