import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  email!: string;
  password!: string;

  constructor(
    private _authService : AuthService
    , private router: Router
  ) {}

  onSubmit() : void {
    const loginData = {
      email: this.email
      , password: this.password
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ${token}');

    this._authService.login(loginData.email, loginData.password, headers).subscribe(
      response => {
        const token = response.token;
        // Stockez le jeton d'authentification localement (dans le localStorage)
        localStorage.setItem('token', token);

        this.router.navigate(['/accueil']);
      },
      error => {
        // Gérer les erreurs de connexion
        console.error(error);
      }
    );
  }
}
