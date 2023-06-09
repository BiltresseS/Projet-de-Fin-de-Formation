import { Component } from '@angular/core';
import { UserSmollInterface } from 'src/app/interfaces/users-interface';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-liste-abonnes',
  templateUrl: './liste-abonnes.component.html',
  styleUrls: ['./liste-abonnes.component.scss']
})
export class ListeAbonnesComponent {
  abonnes! : UserSmollInterface[]

  constructor(
    private _service : UserService
  ) {}

  ngOnInit() {
    let startUrl : string = "http://localhost:5000/api/users"
    this.load(startUrl)
  }

  load(url : string) {
    this._service.getUsers(url).subscribe({
      next : (data : UserSmollInterface[]) => {
        this.abonnes = data
      }
    })
  }
}
