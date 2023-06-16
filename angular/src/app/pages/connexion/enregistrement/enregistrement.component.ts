import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-enregistrement',
  templateUrl: './enregistrement.component.html',
  styleUrls: ['./enregistrement.component.scss']
})
export class EnregistrementComponent {
  pseudo!: string;
  email!: string;
  password!: string;

  constructor(
    private _authService: AuthService
    , private router: Router
  ) {}

  onSubmit(): void {
    this._authService.register(this.pseudo, this.email, this.password)
    .subscribe(
      response => {
        const token = response.token;
        // Stockez le jeton d'authentification localement (dans le localStorage)
        localStorage.setItem('token', token);
        this.router.navigate(['/accueil']);
      },
      error => {
        // Gérer les erreurs d'enregistrement
        console.error(error);
      }
    );
  }
}