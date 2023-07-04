import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ModifyTestInterface, NewTestInterface, SubmitNewTestInterface, SubmitReturnNewTestInterface, TestInterface, TestPreviewInterface } from '../interfaces/tests-interface';
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

  submitTest(test: SubmitNewTestInterface): Observable<TestInterface> {
    return this._client.post<SubmitReturnNewTestInterface>(this.url, test).pipe(
      map((newTest: SubmitReturnNewTestInterface) => {
        const testWithId: TestInterface = {
          id: 0,
          upVotes: [],
          ...newTest,
        };
        return testWithId;
      })
    );
  }

  updateTest(testId: number, test: ModifyTestInterface): Observable<TestInterface> {
    const url = `${this.url}/${testId}`;
    return this._client.put<TestInterface>(url, test);
  }
}