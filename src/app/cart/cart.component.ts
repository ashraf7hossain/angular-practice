import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private _pserv: ProductsService) { }
  items:Product[] = [];
  ngOnInit(): void {
    this._pserv.currentCart.subscribe(data => this.items = data);
    this.items = this.items.filter(item => item.quantity > 0);
  }

}
