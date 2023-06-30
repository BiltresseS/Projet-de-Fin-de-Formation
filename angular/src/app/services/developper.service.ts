import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DevelopperInterface, NewDevelopperInterface } from '../interfaces/tests-interface';

@Injectable({
  providedIn: 'root'
})
export class DevelopperService {

  private readonly url: string = "http://localhost:5000/api/developpers"

  constructor(private _client: HttpClient) { }

  getDeveloppers(): Observable<DevelopperInterface[]> {

    return this._client.get<DevelopperInterface[]>(this.url);
  }

  getDevelopper(url : string): Observable<DevelopperInterface> {

    return this._client.get<DevelopperInterface>(url);
  }

  addDevelopper(developper: NewDevelopperInterface): Observable<DevelopperInterface> {

    return this._client.post<DevelopperInterface>(this.url, developper)
  }
}