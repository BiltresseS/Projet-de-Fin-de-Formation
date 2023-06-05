import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsoleInterface } from '../interfaces/consoles';

@Injectable({
  providedIn: 'root'
})
export class ConsoleFilterService {
  
  private readonly url : string = "http://localhost:4200/api/consoles"

  constructor(private _client : HttpClient) {}

  getFilters(url : string): Observable<ConsoleInterface[]> {
    return this._client.get<ConsoleInterface[]>(url);
  }
}