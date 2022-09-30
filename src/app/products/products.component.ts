import { Component, OnInit, Input } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { Product } from '../product';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  constructor(private _pserv: ProductsService , private _api: ApiService , private _auth: AuthService, private router: Router) { }
  productName: String = "";
  productQuantity: number = 0;
  toggle: boolean = false;
  filter: string = "";
  toaster: string = "";
  user:boolean = false;
  cartProducts:any[] = [];
  total:number = 0;

  ngOnInit(): void {
    this._api.currentProducts.subscribe(res => this.products = res);
    this._auth.currentSingleUser.subscribe(res => {
      if(res.email){
        this.user = true;
      }
    });
    this._api.currentCart.subscribe(res => this.cartProducts = res);

  }
  ngOnDestroy(): void{
  }
  deleteIt(id: any){
    this._pserv.deleteProduct(id);
  }
  changeQuant(id:number, val: number){
    if(val === -1){
      for(let i = 0 ; i < this.cartProducts.length; ++i){
        if(this.cartProducts[i].quantity === 1 && this.cartProducts[i].id === id){
          this.cartProducts.splice(i , 1);
        }
      }
    }
    this._api.changeQuantity(id , val);
    console.log(this.total);
    this.total = this.cartProducts.reduce((a , b)=>(a + b.quantity * b.price),0);
  }
  addToList(id: number, price:any){
    // if(!this.user){
    //   this.router.navigate(['/login']);
    //   return;
    // }
    let findId = this.cartProducts.findIndex(p => p.id === id);
    // this.total = this.cartProducts.reduce((a , b)=>(a + b.quantity * b.price),0);
    if(findId !== -1)return;
    this.total += parseInt(price);
    this._api.addToCart(id);
    // this.toaster = "active";
    // setTimeout(()=>{
    //   this.toaster = "";
    // },2000);

  }
  getSelected(value: string){
    switch(value){
      case "price":
        this.customSort("price");
        break;
      case "available":
        this.customSort("available");
        break;
    }
  }
  customSort(property: string){
    this.products.sort((a:any , b:any) =>{
      let val1 = parseInt(a[property]);
      let val2 = parseInt(b[property]);
      if(val1 > val2)return this.toggle?-1:1;
      if(val1 < val2)return this.toggle?1:-1;
      return 0;
    } );
  }
  reverse(){
    this.products.reverse();
  }

}
