import { Component } from "@angular/core"
import { ConsoleInterface } from "src/app/interfaces/consoles-interface"
import { GenreInterface, TestPreviewInterface, upVotesInterface } from "src/app/interfaces/tests-interface"
import { ConsoleFilterService } from "src/app/services/console-filter.service"
import { GenreFilterService } from "src/app/services/genre-filter.service"
import { TestService } from "src/app/services/test.service"

@Component({
  selector: 'app-liste-tests',
  templateUrl: './liste-tests.component.html',
  styleUrls: ['./liste-tests.component.scss']
})
export class ListeTestsComponent {

  tests! : TestPreviewInterface[]
  consoles! : ConsoleInterface[]
  genres! : GenreInterface[]
  upVotes! : upVotesInterface[]
  selectedConsole: number | null
  selectedGenre: number | null

  constructor(
    private _service : TestService
    , private _consoleService : ConsoleFilterService
    , private _genreService : GenreFilterService
  ) {
    this.selectedConsole = null
    this.selectedGenre = null
  }

  ngOnInit() {
    let startUrl : string = "http://localhost:5000/api/test"
    this.load(startUrl)
    this.getConsoles()
    this.getGenres()
  }

  load(url : string) {
    this._service.getPreviewTest(url).subscribe({
      next : (data : TestPreviewInterface[]) => {
        this.tests = data.reverse()
      }
    })
  }

  getConsoles() {
    this._consoleService.filterConsoles().subscribe({
      next: (data: ConsoleInterface[]) => {
        this.consoles = data;
      }
    });
  }

  getGenres() {
    this._genreService.filterGenres().subscribe({
      next: (data: GenreInterface[]) => {
        this.genres = data;
      }
    });
  }

  onConsoleSelected() {
    if (this.selectedConsole) {
      const url = `http://localhost:5000/api/test/console/${this.selectedConsole}`;
      this.load(url);
    } else {
      const startUrl = "http://localhost:5000/api/test";
      this.load(startUrl);
    }
  }

  onGenreSelected() {
    if (this.selectedGenre) {
      const url = `http://localhost:5000/api/test/genre/${this.selectedGenre}`;
      this.load(url);
    } else {
      const startUrl = "http://localhost:5000/api/test";
      this.load(startUrl);
    }
  }
}
