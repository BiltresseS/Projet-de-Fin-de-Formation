import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface, UserSmollInterface } from '../interfaces/users-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private readonly url : string = "http://localhost:5000/api/users"

  constructor(private _client : HttpClient) {}

  getUsers(url : string): Observable<UserSmollInterface[]> {
    return this._client.get<UserSmollInterface[]>(url);
  }

  getFullUser(url : string): Observable<UserInterface> {
    return this._client.get<UserInterface>(url)
  }

  updateRank(userId: number, updatedRank: { id: number }): Observable<any> {
    const url = `${this.url}/${userId}`;
    return this._client.patch(url, updatedRank);
  }
}
