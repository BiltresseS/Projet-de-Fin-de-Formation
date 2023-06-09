import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TestInterface, TestPreviewInterface } from '../interfaces/tests-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  
  private readonly url : string = "http://localhost:5000/api/test"

  constructor(private _client : HttpClient) {}

  getPreviewTest(url : string): Observable<TestPreviewInterface[]> {
    return this._client.get<TestPreviewInterface[]>(url);
  }

  getFullTest(url : string): Observable<TestInterface> {
    return this._client.get<TestInterface>(url)
  }
}
