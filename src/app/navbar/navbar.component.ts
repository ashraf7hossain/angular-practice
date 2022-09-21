import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _api : ApiService) { }
  count:number = 2;
  ngOnInit(): void {
    this._api.currentCount.subscribe((val)=>this.count = val);
  }
  navigate(path:string):void{

  }
}
