import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _pserv: ProductsService) { }
  count:number = 0;
  ngOnInit(): void {
    this._pserv.currentCount.subscribe((val)=>this.count = val);
  }
  navigate(path:string):void{

  }
}
