import { Component } from '@angular/core';
import { Product } from './product';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';


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
  currentUser: any  = {};

  constructor(private _api: ApiService , private auth: AuthService) {
  }

  ngOnInit(){
    this._api.getData();
    this.auth.getAll();
    this.auth.getAllOrders();
    this.auth.getAllDeliverd();
    this.auth.currentSingleUser.subscribe(res => this.currentUser = res);
  }

}
