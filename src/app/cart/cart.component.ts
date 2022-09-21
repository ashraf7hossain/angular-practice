import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ApiService } from '../services/api.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private _api: ApiService) { }
  items:any[] = [];
  ngOnInit(): void {
    this._api.currentCart.subscribe(data => { 
      this.items = data;
    });
    this.items = this.items.filter(item => item.quantity > 0);
    // console.log(this.items);
  }

}
