import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenreInterface } from '../interfaces/tests-interface';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private readonly url : string = "http://localhost:5000/api/genres"

  constructor(private _client : HttpClient) { }

  getGenres(): Observable<GenreInterface[]> {
    return this._client.get<GenreInterface[]>(this.url);
  }
}
