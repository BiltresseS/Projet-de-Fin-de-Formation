import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/users-interface';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-abonnes',
  templateUrl: './abonnes.component.html',
  styleUrls: ['./abonnes.component.scss']
})
export class AbonnesComponent implements OnInit{
  startUrl : string = "http://localhost:5000/api/users";
  
  user! : UserInterface
  
  constructor(
    private _service : UserService,
    private _route : ActivatedRoute
  ) {}
  
  ngOnInit() {
  this.load()
  }

  load() {
    this._route.params.subscribe(params => {
      const id = params['id'];
      const url = `${this.startUrl}/${id}`;
      this._service.getFullUser(url).subscribe({
        next: (data: UserInterface) => {
          this.user = data;
        }
      });
    });
  }
}
