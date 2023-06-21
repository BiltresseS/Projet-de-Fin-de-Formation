import { Component } from '@angular/core';
import { RanksInterface, UserSmollInterface } from 'src/app/interfaces/users-interface';
import { AuthService } from 'src/app/services/auth.service';
import { RankService } from 'src/app/services/rank.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-liste-abonnes',
  templateUrl: './liste-abonnes.component.html',
  styleUrls: ['./liste-abonnes.component.scss']
})
export class ListeAbonnesComponent {
  startUrl: string = "http://localhost:5000/api/users"
  isAllowed: boolean = false

  abonnes!: UserSmollInterface[]
  ranks!: RanksInterface[]

  constructor(
    private _service: UserService
    , private _ranks: RankService
    , private _auth: AuthService
  ) { }

  ngOnInit() {
    this.getRanks()

    this._auth.getUserProfile().subscribe(
      
      (profile) => {
        if (profile.rank.id >= 1 && profile.rank.id <= 2) {
          this.loadAll(this.startUrl)
        } else {
          this.load(this.startUrl)
        }
      },
      (error) => {
        console.log('Error !');
        console.log(error);
      }
    )
  }

  load(url: string) {
    this._service.getUsers(url).subscribe({
      next: (data: UserSmollInterface[]) => {
        this.abonnes = data
      }
    })
  }

  loadAll(url: string) {
    this._service.getUsers(url, true).subscribe({
      next: (data: UserSmollInterface[]) => {
        this.abonnes = data
      }
    })
  }

  getRanks() {
    this._ranks.getRanks().subscribe({
      next: (data: RanksInterface[]) => {
        this.ranks = data;
      }
    });
  }
}
