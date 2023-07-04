import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { base64ToFile } from 'ngx-image-cropper';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ConsoleInterface, DevelopperInterface, DistributerInterface, GalleryInterface, GenreInterface, ModifyTestInterface, NewDevelopperInterface, NewDistributerInterface, SubmitNewTestInterface, TestInterface } from 'src/app/interfaces/tests-interface';
import { UserInterface } from 'src/app/interfaces/users-interface';
import { ConsoleService } from 'src/app/services/console.service';
import { DevelopperService } from 'src/app/services/developper.service';
import { DistributerService } from 'src/app/services/distributer.service';
import { GenreService } from 'src/app/services/genres.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-modify-test',
  templateUrl: './modify-test.component.html',
  styleUrls: ['./modify-test.component.scss']
})
export class ModifyTestComponent implements OnInit {
  userUrl!: string;
  test!: ModifyTestInterface;
  testId!: number;
  authorProfile!: UserInterface;
  imageChangedEvent: any = '';
  cover: string | ArrayBuffer | null = null;
  consoles!: ConsoleInterface[];
  selectedConsole: number[] = [];
  genres!: GenreInterface[];
  selectedGenre!: number[];
  developpeur!: number
  distributeur!: number
  listDeveloppers!: DevelopperInterface[]
  listDistributers!: DistributerInterface[]
  showNewDevelopper: boolean = false;
  newDevelopper!: NewDevelopperInterface;
  showNewDistributer: boolean = false;
  newDistributer!: NewDistributerInterface;
  gallery: GalleryInterface[] = [];
  selectedImage: File | null = null;
  newImageComment: string = '';

  constructor(
    private _consoles: ConsoleService
    , private _genres: GenreService
    , private _developpers: DevelopperService
    , private _distributers: DistributerService
    , private _service: TestService
    , private _route: ActivatedRoute
    , private _router: Router
    , private _http: HttpClient
    , private ngxSmartModalService: NgxSmartModalService
  ) {
    this.newDevelopper = { name: '' }
    this.newDistributer = { name: '' }
  }

  ngOnInit() {
    this.getConsoles()
    this.getGenres()
    this.getDeveloppers()
    this.getDistributers()

    this._route.params.subscribe(params => {
      this.testId = params['testId'];
      this.getTestData();
  })

    const userId = this.getUserIdFromToken();
    const userUrl = `http://localhost:5000/api/users/${userId}`;

  }

  getTestData() {
    const apiUrl = `http://localhost:5000/api/test/${this.testId}`;
    this._http.get<TestInterface>(apiUrl).subscribe((data) => {
      this.test = data;
      this.getImageBase64(data.cover).then(
        (base64Content: string) => {
          // Remplace l'URL de l'image par son contenu en base64
          this.cover = base64Content;
          this.test.cover = base64Content.split(',')[1];
        },
        (error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération de l\'image en base64 :', error);
        }
      );
      this.selectedConsole = this.test.consoles.map(console => console.id);
      this.selectedGenre = this.test.genres.map(genre => genre.id);
      this.developpeur = data.developpeur.id;
      this.distributeur = data.distributeur.id;
      this.gallery = data.gallery;
      const base64Promises = this.gallery.map((item) => {
        return this.getImageBase64(item.file)
          .then((base64Content) => {
            item.file = base64Content;
          })
          .catch((error) => {
            console.error('Une erreur s\'est produite lors de la récupération de l\'image en base64 :', error);
          });
      });
      
      // Attend que toutes les promesses de récupération d'image soient résolues
      Promise.all(base64Promises)
        .then(() => {
          console.log('Récupération des images en base64 terminée.');
        })
        .catch((error) => {
          console.error('Une erreur s\'est produite lors de la récupération des images en base64 :', error);
        });
    });
  }

  getConsoles() {
    this._consoles.getConsoles().subscribe({
      next: (data: ConsoleInterface[]) => {
        this.consoles = data;
      }
    });
  }

  getGenres() {
    this._genres.getGenres().subscribe({
      next: (data: GenreInterface[]) => {
        this.genres = data;
      }
    });
  }

  getDeveloppers() {
    this._developpers.getDeveloppers().subscribe({
      next: (data: DevelopperInterface[]) => {
        this.listDeveloppers = data;
      }
    });
  }

  getDistributers() {
    this._distributers.getDistributers().subscribe({
      next: (data: DistributerInterface[]) => {
        this.listDistributers = data;
      }
    });
  }

  private getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    const tokenPayload = JSON.parse(this.decodeToken(token ?? ""));
    const userId = tokenPayload.sub;
    return userId;
  }

  private decodeToken(token: string): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = window.atob(base64);
    return decodedToken;
  }

  getImageBase64(imageURL: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
  
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        } else {
          reject('Impossible de récupérer le contexte du canevas.');
        }
      };
      img.onerror = function (error) {
        reject(error);
      };
      img.src = imageURL;
    });
  }

  getBase64(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () { };
    reader.onerror = function (error) {
      console.log('Error getbase64() function into create-test.compo.ts: ', error);
    };
  }

  onCoverSelected(event: any) {
    const file = event.target.files[0] as File;
    this.getBase64(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.cover = reader.result;
      this.test.cover = (reader.result as string).split(',')[1]
    };
  }

  showNewDevelopperInput(): void {
    this.openModal('developperModal');
  }

  showNewDistributerInput(): void {
    this.openModal('distributerModal');
  }

  openModal(modalId: string) {
    this.ngxSmartModalService.open(modalId);
  }

  closeModal(modalId: string) {
    this.ngxSmartModalService.close(modalId);
  }

  submitDevelopperForm(): void {
    this._developpers.addDevelopper(this.newDevelopper).subscribe({
      next: (data: DevelopperInterface) => {
        // Obtient l'ID réellement attribué au développeur ajouté
        const newDevelopperId = data.id;

        // Ajoute le nouvel élément à la liste des développeurs
        this.listDeveloppers.push(data);

        // Réinitialise les valeurs
        this.newDevelopper.name = '';

        // Ferme la modale
        this.closeModal('developperModal');

        // Définit le développeur nouvellement ajouté comme sélectionné
        // this.test.developpeur = newDevelopperId;
      }
    });
  }

  submitDistributerForm(): void {
    this._distributers.addDistributer(this.newDistributer).subscribe({
      next: (data: DistributerInterface) => {
        // Obtient l'ID réellement attribué au distributeur ajouté
        const newDistributerId = data.id;

        // Ajoute le nouvel élément à la liste des distributeurs
        this.listDistributers.push(data);

        // Réinitialise les valeurs
        this.newDistributer.name = '';

        // Ferme la modale
        this.closeModal('distributerModal');

        // Définit le distributeur nouvellement ajouté comme sélectionné
        // this.test.distributeur = newDistributerId;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
    this.getBase64(this.selectedImage);
  }

  addImage() {
    const userId = this.getUserIdFromToken();
    const userUrl = `http://localhost:5000/api/users/${userId}`;

    if (this.selectedImage && this.newImageComment) {
      this.getBase64(this.selectedImage);

      const reader = new FileReader();
      reader.onload = () => {
        const galleryItem: GalleryInterface = {
          file: reader.result as string
          , commentaire: this.newImageComment
          , uploader: userUrl
        };
        this.gallery.push(galleryItem);
        this.newImageComment = '';
        this.closeModal('ajoutImageModal');
      };

      reader.onerror = (error) => {
        console.log('Error in addImage() - FileReader:', error);
      };

      reader.readAsDataURL(this.selectedImage);
    }
  }

  removeImage(image: GalleryInterface): void {
    const index = this.gallery.indexOf(image);
    if (index !== -1) {
      this.gallery.splice(index, 1);
    }
  }

  submitForm(): void {    
    const test: ModifyTestInterface = {
      title: this.test.title
      , cover: this.test.cover
      , consoles: this.test.consoles
      , genres: this.test.genres
      , developpeur: this.test.developpeur
      , distributeur: this.test.distributeur
      , dateSortieJAP: this.test.dateSortieJAP
      , dateSortieUS: this.test.dateSortieUS
      , dateSortiePAL: this.test.dateSortiePAL
      , resume: this.test.resume
      , test: this.test.test
      , note: this.test.note
      , author: this.test.author
      , gallery: this.gallery.map((item) => {
        return {
          file: item.file.split(',')[1],
          commentaire: item.commentaire,
          uploader: item.uploader
        };
      })
      , upVotes: this.test.upVotes
    };

    if (this.testId) {
      // Modification d'un test existant
      this._service.updateTest(this.testId, test).subscribe(
        (updatedTest) => {
          this._router.navigate([`/test/${this.testId}`]);
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la modification du test', error);
        }
      );
    } else {
      // Création d'un nouveau test
      this._service.submitTest(test).subscribe(
        (response) => {
          const testId = response.id
          this._router.navigate([`/test/${testId}`]);
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la soumission du test', error);
        }
      );
    }
  }
}