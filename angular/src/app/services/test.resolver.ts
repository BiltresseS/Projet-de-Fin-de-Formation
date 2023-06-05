import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TestService } from './test.service';
import { TestInterface } from '../interfaces/test-interface';

@Injectable({
  providedIn: 'root'
})
export class TestResolver implements Resolve<TestInterface> {

  constructor(private _service : TestService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TestInterface> {
    return this._service.getTest(route.params['url']);
  }
}