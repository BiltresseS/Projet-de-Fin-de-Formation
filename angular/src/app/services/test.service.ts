import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TestInterface } from '../interfaces/test-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  
  private readonly url : string = "http://localhost:4200/api/test"

  constructor(private _client : HttpClient) {}

  getTest(url : string): Observable<TestInterface> {
    return this._client.get<TestInterface>(url);
  }
}
