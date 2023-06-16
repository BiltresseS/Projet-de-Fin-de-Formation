import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/users-interface';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  userProfile! : UserInterface;

  constructor(
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const tokenPayload = JSON.parse(this.decodeToken(token ?? ""));
    const userId = tokenPayload.sub;
    const url = `http://localhost:5000/api/users/${userId}`;

    this._http.get(url).subscribe((profile: any) => {
      this.userProfile = profile;
    });
  }

  private decodeToken(token: string): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = window.atob(base64);
    return decodedToken;
  }
}