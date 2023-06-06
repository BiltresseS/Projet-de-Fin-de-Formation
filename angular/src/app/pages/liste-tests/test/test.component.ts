import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConsoleInterface } from "src/app/interfaces/consoles-interface";
import { GenreInterface, TestInterface, upVotesInterface } from "src/app/interfaces/test-interface";
import { TestService } from "src/app/services/test.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  startUrl : string = "http://localhost:5000/api/test";
  
  test! : TestInterface
  consoles! : ConsoleInterface[]
  genres! : GenreInterface[]
  upVotes! : upVotesInterface[]

  
  
  constructor(
    private _service : TestService,
    private _route : ActivatedRoute
  ) {}
  
  ngOnInit() {
  this.load()
  }

  load() {
    this._route.params.subscribe(params => {
      const id = params['id']; // Assurez-vous que le nom 'id' correspond à celui utilisé dans la définition de vos routes
      const url = `${this.startUrl}/${id}`;
      this._service.getFullTest(url).subscribe({
        next: (data: TestInterface) => {
          this.test = data;
        }
      });
    });
  }
  
}
