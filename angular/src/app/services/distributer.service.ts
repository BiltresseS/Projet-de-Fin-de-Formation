import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DistributerInterface, NewDistributerInterface } from '../interfaces/tests-interface';

@Injectable({
  providedIn: 'root'
})
export class DistributerService {
  private readonly url: string = "http://localhost:5000/api/distributers"

  constructor(private _client: HttpClient) { }

  getDistributers(): Observable<DistributerInterface[]> {
    return this._client.get<DistributerInterface[]>(this.url);
  }

  getDistributeur(url : string): Observable<DistributerInterface> {

    return this._client.get<DistributerInterface>(url);
  }

  addDistributer(distributer: NewDistributerInterface): Observable<DistributerInterface> {

    return this._client.post<DistributerInterface>(this.url, distributer)
  }
}
