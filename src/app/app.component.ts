import { Component } from '@angular/core';
import { Product } from './product';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
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
  // items: Observable<any[]>;
  constructor(/*firestore: Firestore*/) {
    // const collect = collection(firestore, 'food_items');
    // this.items = collectionData(collect);
    // // console.log(this.items);
  }

  ngOnInit(){
    // console.log(this.items);
  }

}
