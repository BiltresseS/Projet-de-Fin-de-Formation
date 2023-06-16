import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  
  public IsLogged : Subject<boolean> = new Subject();
  constructor() { }

  public setToken(token : string){
    localStorage.setItem('token', token);
    this.IsLogged.next(true);
  }
  public getToken(){
    return localStorage.getItem('token');
  }

  public checkToken(){
    this.IsLogged.next(this.getToken() != null); 
  }

  public removeToken(){
    localStorage.removeItem('token');
    this.IsLogged.next(false);
  }
}
