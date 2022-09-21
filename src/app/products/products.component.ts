import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ApiService } from '../services/api.service';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  constructor(private _pserv: ProductsService , private _api: ApiService) { }
  productName: String = "";
  productQuantity: number = 0;
  toggle: boolean = false;
  ngOnInit(): void {
    // this._api.getData().subscribe(res => this.products = res);
    this._api.currentProducts.subscribe(res => this.products = res);
  }
  ngOnDestroy(): void{
  }
  deleteIt(id: any){
    this._pserv.deleteProduct(id);
  }
  changeQuant(id:number, val: number){
     this._api.changeQuantity(id , val);
    //  this.productQuantity = this._api.count;
    
  }
  addToList(id: number){
    this._api.addToCart(id);
  }
  getSelected(value: string){
    console.log(value);
    switch(value){
      case "price":
        this.toggle = !this.toggle;
        this.products = this.products.sort((a:any , b:any) => {
          if(a.price > b.price)return this.toggle?1:-1;
          else if(a.price < b.price)return this.toggle?-1:1;
          else return 0;
        });
        break;
      case "name":
        this.products = this.products.sort((a:any , b:any) => {
          let sa = a.name.toLowerCase();
          let sb = a.name.toLowerCase();
          if(sa > sb)return -1;
          else if(sa < sb) return 1;
          else return 0;
        });
        console.log(this.products);
    }
    // console.log(this.products);
  }

}
