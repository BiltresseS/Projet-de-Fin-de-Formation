import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { NewUserInterface, UserInterface } from '../interfaces/users-interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/login';

  constructor(
    private http: HttpClient
    , private _local : LocalStorageService
    ) { }

  login(email: string, password: string, headers? : HttpHeaders): Observable<any> {
    const loginData = { email, password };
    const options = { headers };
    return from(this.http.post(this.apiUrl, loginData, options));
  }

  register(login: string, mail: string, mdp: string): Observable<any> {
    const registerData = { login, mail, mdp };
    return this.http.post(`${this.apiUrl}/register`, registerData);
  }

  getUserProfile(): Observable<UserInterface> {
    const token = this._local.getToken();
    const decodedToken = this._local.decodeToken(token ?? '');
    const userId = JSON.parse(decodedToken).sub; // Assure-toi que la clé correcte pour l'ID est utilisée ici
    const url = `http://localhost:5000/api/users/${userId}`;
    return this.http.get<UserInterface>(url);
  }
}
