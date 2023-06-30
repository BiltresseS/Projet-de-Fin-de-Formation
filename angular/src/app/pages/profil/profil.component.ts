import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/users-interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  userProfile! : UserInterface;
  token! : string | null

  constructor( private _auth : AuthService ) {}

  ngOnInit(): void {
    this._auth.getUserProfile().subscribe(
      (profile: UserInterface) => {
        this.userProfile = profile;
      },
      (error) => {
        // Gère les erreurs de récupération du profil ici
        console.log('Error !');
        console.log(error);
        
      }
    );
  }
}