import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DevelopperInterface, DistributerInterface, TestInterface } from "src/app/interfaces/tests-interface";
import { UserInterface } from "src/app/interfaces/users-interface";
import { DevelopperService } from "src/app/services/developper.service";
import { DistributerService } from "src/app/services/distributer.service";
import { TestService } from "src/app/services/test.service";
import { UserService } from "src/app/services/users.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  startUrl: string = "http://localhost:5000/api/test";

  test!: TestInterface
  author!: UserInterface
  developpeur! : DevelopperInterface
  distributeur! : DistributerInterface

  constructor(
    private _service: TestService
    , private _user: UserService
    , private _developpeur : DevelopperService
    , private _distributeur : DistributerService
    , private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.load()
  }

  load() {
    this._route.params.subscribe(params => {
      const id = params['id']; // Assurez-vous que le nom 'id' correspond à celui utilisé dans la définition de vos routes
      const url = `${this.startUrl}/${id}`;

      this._service.getFullTest(url).subscribe({
        next: (data: TestInterface) => {
          this.test = data;
          
          this._user.getFullUser(this.test.author).subscribe(
            (author: UserInterface) => {
              this.author = author;
            },
            (error) => {
              // Gérer les erreurs de requête
              console.log("erreur : " + error);

            }
          );

          // this._developpeur.getDevelopper("http://localhost:5000/api/developpers/" + this.test.developpeur).subscribe(
          //   (developpeur: DevelopperInterface) => {
          //     this.developpeur = developpeur;
          //     console.log(developpeur);
          //   },
          //   (error) => {
          //     // Gérer les erreurs de requête
          //     console.log("erreur : " + error);
          //   }
          // );

          // this._distributeur.getDistributeur("http://localhost:5000/api/developpers/" + this.test.distributeur).subscribe(
          //   (distributeur: DistributerInterface) => {
          //     this.distributeur = distributeur;
          //   },
          //   (error) => {
          //     // Gérer les erreurs de requête
          //     console.log("erreur : " + error);
          //   }
          // );
          
        }
      });
    });
  }
}