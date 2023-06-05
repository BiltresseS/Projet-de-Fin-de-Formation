import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TestInterface } from "src/app/interfaces/test-interface";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  test! : TestInterface

  constructor(private _ar : ActivatedRoute) {}

  ngOnInit() {
    this.test = this._ar.snapshot.data['test']
  }
}
