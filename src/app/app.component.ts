import { Component } from '@angular/core';
import { Product } from './product';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  name : String = "Ashraf Hossain";
  birthDay : Date = new Date("04/12/1998");
  showProducts = true;
  message = "Edit";
  canEdit = false;
  constructor(private _api: ApiService) {
  }

  ngOnInit(){
    this._api.getData();
  }

}
