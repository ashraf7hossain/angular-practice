import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  constructor(private _pserv: ProductsService) { }
  productName: String = "";
  productQuantity: number = 0;
  ngOnInit(): void {
    this._pserv.currentProducts.subscribe(data => {
      // this._pserv.products = data;
      this.products = data;
      this._pserv.prods.next(this.products);
    })
    ;
  }
  ngOnDestroy(): void{
    // this.products = [];
  }
  deleteIt(id: any){
    this._pserv.deleteProduct(id);
  }
  changeQuant(id:number, val: number){
    this._pserv.changequantity(id,val);
  }
  addToList(id: number){
    this._pserv.addToCart(id);
  }
  getSelected(value: string){
    switch(value){
      case "price":
        this.products = this.products.sort((a:Product , b:Product) => {
          if(a.price > b.price)return 1;
          else if(a.price < b.price)return -1;
          else return 0;
        });
        break;
      case "name":
        this.products = this.products.sort((a:Product , b:Product) => {
          let sa = a.name.toLowerCase();
          let sb = a.name.toLowerCase();
          if(sa > sb)return 1;
          else if(sa < sb) return -1;
          else return 0;
        });
        console.log(this.products);
    }
    // console.log(this.products);
  }

}
