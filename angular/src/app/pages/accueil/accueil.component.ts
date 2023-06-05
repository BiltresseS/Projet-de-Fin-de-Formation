import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ConsoleInterface } from "src/app/interfaces/consoles-interface";
import { GenreInterface, TestPreviewInterface, upVotesInterface } from "src/app/interfaces/test-interface";
import { TestPreviewService } from "src/app/services/test-preview.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  tests! : TestPreviewInterface[]
  consoles! : ConsoleInterface[]
  genres! : GenreInterface[]
  upVotes! : upVotesInterface[]

  constructor(
    private _service : TestPreviewService
  ) {}

  ngOnInit() {
    let startUrl : string = "http://localhost:5000/api/test"
    this.load(startUrl)
  }

  load(url : string) {
    this._service.getPreviewTest(url).subscribe({
      next : (data : TestPreviewInterface[]) => {
        this.tests = data.reverse()
        console.log(this.tests);
      }
    })
  }
}
