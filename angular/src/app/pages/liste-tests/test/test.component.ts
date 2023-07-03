import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DevelopperInterface, DistributerInterface, TestInterface } from "src/app/interfaces/tests-interface";
import { UserInterface } from "src/app/interfaces/users-interface";
import { AuthService } from "src/app/services/auth.service";
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
  developpeur!: DevelopperInterface
  distributeur!: DistributerInterface

  isAllowed: boolean = false

  constructor(
    private _service: TestService
    , private _user: UserService
    , private _route: ActivatedRoute
    , private _router: Router
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
              this.checkAuthorization();
            },
            (error) => {
              // Gérer les erreurs de requête
              console.log("erreur : " + error);
            }
          );
        }
      });
    });
  }

  checkAuthorization() {
    const userId = this.getUserIdFromToken(); // Obtiens l'ID de l'utilisateur à partir du token
    const userRank = this.author.rank.id; // Obtient le rang de l'utilisateur

    this.isAllowed = userId === this.author.id || userRank === 1 || userRank === 2;
  }

  getUserIdFromToken(): number {
    const token = localStorage.getItem('token');
    const tokenPayload = JSON.parse(this.decodeToken(token ?? ''));
    const userId = tokenPayload.sub;

    return userId;
  }

  decodeToken(token: string): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = window.atob(base64);

    return decodedToken;
  }

  modifyTest(testId: number) {
    this._router.navigate(['/modify-test/', testId]);
  }
}