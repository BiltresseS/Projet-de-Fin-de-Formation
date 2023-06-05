import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenreInterface, TestPreviewInterface } from '../interfaces/test-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestPreviewService {
  
  private readonly url : string = "http://localhost:4200/api/test"

  constructor(private _client : HttpClient) {}

  getPreviewTest(url : string): Observable<TestPreviewInterface[]> {
    return this._client.get<TestPreviewInterface[]>(url);
  }
}
