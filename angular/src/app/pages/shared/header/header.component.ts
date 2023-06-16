import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConsoleInterface } from "src/app/interfaces/consoles-interface";
import { ConsoleFilterService } from "src/app/services/console-filter.service";
import { LocalStorageService } from "src/app/services/local-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLogged! : boolean;
  consoles! : ConsoleInterface[]

  constructor(
    private _service : ConsoleFilterService
    , private _router : Router,
    private _local : LocalStorageService
    ){}

  ngOnInit() {
    this._local.IsLogged.subscribe( value => this.isLogged=value);
    this._local.checkToken();
    let startUrl : string = "http://localhost:5000/api/consoles"
    this.load(startUrl)

    
  }

  load(url : string) {
    this._service.getConsoles(url).subscribe({
      next : (data : ConsoleInterface[]) => {
        this.consoles = data.reverse()
      }
    })
  }

  logout(): void {
    this._local.removeToken();
    this._router.navigate(['/connexion']);
  }
}