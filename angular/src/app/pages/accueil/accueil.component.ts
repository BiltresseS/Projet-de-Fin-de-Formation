import { Component } from "@angular/core";
import { ConsoleInterface } from "src/app/interfaces/consoles-interface";
import { GenreInterface, TestPreviewInterface, upVotesInterface } from "src/app/interfaces/tests-interface";
import { TestService } from "src/app/services/test.service";

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
    private _service : TestService
  ) {}

  ngOnInit() {
    let startUrl : string = "http://localhost:5000/api/test"
    this.load(startUrl)
  }

  load(url : string) {
    this._service.getPreviewTest(url).subscribe({
      next : (data : TestPreviewInterface[]) => {
        this.tests = data.reverse()
      }
    })
  }
}
