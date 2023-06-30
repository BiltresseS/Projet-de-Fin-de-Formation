import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsoleInterface } from '../interfaces/tests-interface';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  
  private readonly url : string = "http://localhost:5000/api/consoles"

  constructor(private _client : HttpClient) {}

  getConsoles(): Observable<ConsoleInterface[]> {
    return this._client.get<ConsoleInterface[]>(this.url);
  }
}