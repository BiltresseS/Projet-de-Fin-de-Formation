import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RanksInterface, UserInterface } from 'src/app/interfaces/users-interface';
import { AuthService } from 'src/app/services/auth.service';
import { RankService } from 'src/app/services/rank.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-abonnes',
  templateUrl: './abonnes.component.html',
  styleUrls: ['./abonnes.component.scss']
})
export class AbonnesComponent implements OnInit{
  startUrl : string = "http://localhost:5000/api/users";
  isAllowed: boolean = false
  selectedRank: number = 0;
  
  user! : UserInterface
  ranks! : RanksInterface[]
  
  constructor(
    private _service : UserService
    , private _route : ActivatedRoute
    , private _auth : AuthService
    , private _ranks : RankService
  ) {}
  
  ngOnInit() {
  this.load()
  this.getRanks()

  this._auth.getUserProfile().subscribe(
    (profile) => {
      if (profile.rank.id >= 1 && profile.rank.id <= 3) {
        this.isAllowed = true;
      } else {
        this.isAllowed = false;
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
    this._route.params.subscribe(params => {
      const id = params['id'];
      const url = `${this.startUrl}/${id}`;
      this._service.getFullUser(url).subscribe({
        next: (data: UserInterface) => {
          this.user = data;
          this.selectedRank = data.rank.id; // Initialise la valeur sélectionnée
          console.log(data);
          
        }
      });
    });
  }

  getRanks() {
    this._ranks.getRanks().subscribe({
      next: (data: RanksInterface[]) => {
        this.ranks = data;
        console.log(this.ranks);
        
      }
    });
  }

  onRankSelected() {
    const updatedRank = { id: this.selectedRank };
    const userId = this.user.id; // Assurez-vous que vous avez une propriété id dans votre interface UserInterface
  
    this._service.updateRank(userId, updatedRank).subscribe(
      (response) => {
        console.log('Le rang a été mis à jour avec succès !');
      },
      (error) => {
        console.log('Erreur lors de la mise à jour du rang :');
        console.log(error);
      }
    );
  }
}
