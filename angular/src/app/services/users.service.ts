import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface, UserSmollInterface } from '../interfaces/users-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url: string = "http://localhost:5000/api/users"

  constructor(private _client: HttpClient) { }

  getUsers(url: string, includeDeleted: boolean = false): Observable<UserSmollInterface[]> {
    if (includeDeleted) {
      url = `${url}?withDeleted=true`;
    }

    return this._client.get<UserSmollInterface[]>(url);
  }

  getFullUser(url: string, includeDeleted: boolean = false): Observable<UserInterface> {
    if (includeDeleted) {
      url = `${url}?withDeleted=true`;
    }

    return this._client.get<UserInterface>(url)
  }

  updateRank(userId: number, updatedRank: { id: number }): Observable<any> {
    const url = `${this.url}/${userId}`;

    return this._client.patch(url, updatedRank);
  }

  disable(userId: number) {
    const url = `${this.url}/${userId}`;

    return this._client.delete(url)
  }

  reenable(userId: number) {
    const url = `${this.url}/${userId}/reactivate`;
     
    // Envoyez la requête HTTP en incluant les en-têtes d'authentification
    return this._client.patch(url, null);
  }
}
