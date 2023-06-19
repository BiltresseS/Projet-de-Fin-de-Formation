import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RanksInterface } from '../interfaces/users-interface';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  private readonly url : string = "http://localhost:5000/api/ranks"

  constructor(private _client : HttpClient) { }

  getRanks(): Observable<RanksInterface[]> {
    return this._client.get<RanksInterface[]>(this.url);
  }
}
