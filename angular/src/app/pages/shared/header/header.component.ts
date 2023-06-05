import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConsoleInterface } from "src/app/interfaces/consoles-interface";
import { ConsoleFilterService } from "src/app/services/console-filter.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  consoles! : ConsoleInterface[]

  constructor(
    private _service : ConsoleFilterService,
    private _router : Router
    ){}

  ngOnInit() {
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
}