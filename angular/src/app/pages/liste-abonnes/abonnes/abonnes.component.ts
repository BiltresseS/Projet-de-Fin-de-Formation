import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RanksInterface, UserInterface } from 'src/app/interfaces/users-interface';
import { AuthService } from 'src/app/services/auth.service';
import { RankService } from 'src/app/services/rank.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-abonnes',
  templateUrl: './abonnes.component.html',
  styleUrls: ['./abonnes.component.scss']
})
export class AbonnesComponent implements OnInit {
  startUrl: string = "http://localhost:5000/api/users";
  isAllowed: boolean = false
  selectedRank: number = 0;

  user!: UserInterface
  ranks!: RanksInterface[]

  constructor(
    private _service: UserService
    , private _activRoute: ActivatedRoute
    , private _auth: AuthService
    , private _ranks: RankService
    , private _router: Router
  ) { }

  ngOnInit() {
    this.getRanks()

    this._auth.getUserProfile().subscribe(
      (profile) => {
        if (profile.rank.id >= 1 && profile.rank.id <= 2) {
          this.isAllowed = true;
          this.loadAll()
        } else {
          this.isAllowed = false;
          this.load()
        }
      },
      (error) => {
        // Gère les erreurs de récupération du profil ici
        console.log('Error !');
        console.log(error);
      }
    );
  }

  load() {
    this._activRoute.params.subscribe(params => {
      const id = params['id'];
      const url = `${this.startUrl}/${id}`;
      this._service.getFullUser(url).subscribe({
        next: (data: UserInterface) => {
          this.user = data;
          this.selectedRank = data.rank.id; // Initialise la valeur sélectionnée
        }
      });
    });
  }

  loadAll() {
    this._activRoute.params.subscribe(params => {
      const id = params['id'];
      const url = `${this.startUrl}/${id}`;
      this._service.getFullUser(url, true).subscribe({
        next: (data: UserInterface) => {
          this.user = data;
          this.selectedRank = data.rank.id; // Initialise la valeur sélectionnée
        }
      });
    });
  }

  getRanks() {
    this._ranks.getRanks().subscribe({
      next: (data: RanksInterface[]) => {
        this.ranks = data;
      }
    });
  }

  onRankSelected() {
    const updatedRank = { id: this.selectedRank };
    const userId = this.user.id; // Assurez-vous que vous avez une propriété id dans votre interface UserInterface

    this._service.updateRank(userId, updatedRank).subscribe(
      (response) => {
      },
      (error) => {
        console.log('Erreur lors de la mise à jour du rang :');
        console.log(error);
      }
    );
  }

  disableUser() {
    const userId = this.user.id;

    this._service.disable(userId).subscribe(
      (response) => {
        this._router.navigate(['/liste-abonnes']);
      },
      (error) => {
        console.log("Erreur lors de la désactivation de l'utilisateur : ");
        console.log(error);
      }
    );
  }

  reenableUser() {
    const userId = this.user.id;

    this._service.reenable(userId)
      .subscribe(
        response => {
          this._router.navigate(['/liste-abonnes']);
        },
        error => {
          console.log("Erreur lors de la réactivation de l'utilisateur : ");
          console.log(error);
        }
      );
  }
}