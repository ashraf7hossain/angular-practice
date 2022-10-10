import { Component, OnInit, Input, AfterViewInit, ElementRef } from '@angular/core';
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
  constructor(private _pserv: ProductsService, private _api: ApiService, private _auth: AuthService, private router: Router, private elem: ElementRef) { }
  productName: String = "";
  productQuantity: number = 0;
  toggle: boolean = false;
  filter: string = "";
  toaster: string = "";
  user: boolean = false;
  cartProducts: any[] = [];
  total: number = 0;
  tempProducts: any[] = [];
  sortToggle:string = "High";

  ngOnInit(): void {
    this._api.currentProducts.subscribe(res =>{
      this.tempProducts = res;
      this.products = res;
    });
    this._auth.currentSingleUser.subscribe(res => {
      if (res.email) {
        this.user = true;
      }
    });
    this._api.currentCart.subscribe(res => this.cartProducts = res);
    // Client javascript

  }
  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = `
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems,{});
    var elems = document.querySelector('select');
    M.FormSelect.init(elems,{});
    `
    this.elem.nativeElement.appendChild(s);
  }
  ngOnDestroy(): void {
  }
  deleteIt(id: any) {
    this._pserv.deleteProduct(id);
  }
  changeQuant(id: number, val: number) {
    if (val === -1) {
      for (let i = 0; i < this.cartProducts.length; ++i) {
        if (this.cartProducts[i].quantity === 1 && this.cartProducts[i].id === id) {
          this.cartProducts.splice(i, 1);
        }
      }
    }
    this._api.changeQuantity(id, val);
    console.log(this.total);
    this.total = this.cartProducts.reduce((a, b) => (a + b.quantity * b.price), 0);
  }
  addToList(id: number, price: any) {
    // if(!this.user){
    //   this.router.navigate(['/login']);
    //   return;
    // }
    let findId = this.cartProducts.findIndex(p => p.id === id);
    // this.total = this.cartProducts.reduce((a , b)=>(a + b.quantity * b.price),0);
    if (findId !== -1) return;
    this.total += parseInt(price);
    this._api.addToCart(id);
    // this.toaster = "active";
    // setTimeout(()=>{
    //   this.toaster = "";
    // },2000);

  }
  getSelected(value: string) {
    switch (value) {
      case "price":
        this.customSort("price");
        break;
      case "available":
        this.customSort("available");
        break;
    }
  }
  customSort(property: string) {
    this.tempProducts.sort((a: any, b: any) => {
      let val1 = parseInt(a[property]);
      let val2 = parseInt(b[property]);
      if (val1 > val2) return this.toggle ? -1 : 1;
      if (val1 < val2) return this.toggle ? 1 : -1;
      return 0;
    });
  }
  reverse() {
    if(this.sortToggle === 'High'){
      this.sortToggle = 'Low';
    }else{
      this.sortToggle = 'High';
    }
    this.tempProducts.reverse();
  }

  filterSearch(value:string){
    if(value === 'All'){
      this.tempProducts = this.products;
    }
    this.tempProducts = this.products.filter((p:any) => p.category !== value);
  }

  checkOut() {
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['./cart']);
  }
}
