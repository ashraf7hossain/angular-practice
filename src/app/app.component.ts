import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  name : String = "Ashraf Hossain";
  birthDay : Date = new Date("04/12/1998");
}
