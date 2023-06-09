import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string, headers? : HttpHeaders): Observable<any> {
    const loginData = { email, password };
    const options = { headers };
    return from(this.http.post(this.apiUrl, loginData, options));
  }

  register(login: string, email: string, password: string): Observable<any> {
    const registerData = { login, email, password };
    return this.http.post(`${this.apiUrl}/register`, registerData);
  }
}
