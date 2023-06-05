import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsoleInterface } from 'src/app/interfaces/consoles';
import { ConsoleFilterService } from 'src/app/services/console-filter.service';

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent implements OnInit {

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
    this._service.getFilters(url).subscribe({
      next : (data : ConsoleInterface[]) => {
        this.consoles = data
      }
    })
  }

  selectedConsole! : number
  selectConsole(url : number) {
    this._router.navigate(['console', url])
  }
}
