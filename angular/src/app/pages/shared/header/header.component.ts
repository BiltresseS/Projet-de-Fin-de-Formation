import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConsoleInterface } from "src/app/interfaces/tests-interface";
import { UserInterface } from "src/app/interfaces/users-interface";
import { AuthService } from "src/app/services/auth.service";
import { ConsoleService } from "src/app/services/console.service";
import { LocalStorageService } from "src/app/services/local-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLogged!: boolean;
  isAllowed: boolean = false;
  consoles!: ConsoleInterface[]
  profile!: UserInterface

  constructor(
    private _console: ConsoleService
    , private _router: Router
    , private _local: LocalStorageService
    , private _auth: AuthService
  ) { }

  ngOnInit() {
    this._local.IsLogged.subscribe(value => {
      this.isLogged = value;

      if (value) {
        this._auth.getUserProfile().subscribe(
          profile => {
            if (profile.rank.id >= 1 && profile.rank.id <= 3) {
              this.isAllowed = true;
            } else {
              this.isAllowed = false;
            }
            
            this.profile = profile
          },
          error => {
            // Gère les erreurs de récupération du profil ici
            console.log('Error !');
            console.log(error);
          }
        );
      }
    });

    this._local.checkToken();
    this.load()
  }

  load() {
    this._console.getConsoles().subscribe({
      next: (data: ConsoleInterface[]) => {
        this.consoles = data.reverse()
      }
    })
  }

  logout(): void {
    this._local.removeToken();
    this._router.navigate(['/connexion']);
  }
}