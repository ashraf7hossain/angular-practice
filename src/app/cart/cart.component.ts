import { Component, OnInit, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../product';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartForm: FormGroup = new FormGroup({});

  constructor(private _api: ApiService,
              private _auth: AuthService,
              private router: Router,
              private el: ElementRef,
              private renderer: Renderer2) { }
  items:any[] = [];
  total:number = 0;
  currentUser:any = {};
  ngOnInit(): void {
    this._api.currentCart.subscribe(data => { 
      this.items = data;
    });
    this.items = this.items.filter(item => item.quantity > 0);
    this.total = this.items.reduce((a , b) => (a + b.quantity * b.price),0);
    this.total += this.total*0.05 + this.total * 0.15;

    this._auth.currentSingleUser.subscribe(res => this.currentUser = res);
    
    this.cartForm = new FormGroup(
      {
        paycard: new FormControl(''),
        phone: new FormControl('+088')
      }
    );
  }
  mytag:any = "";
  ngAfterViewInit(){
    this.mytag = this.el.nativeElement.querySelector(".modal-backdrop");
    console.log(this.mytag);
  }

  submitOrder(){
    let orderData = {
      item: [...this.items],
      total: this.total,
      userId: this.currentUser.id,
      card: this.cartForm.value.paycard,
      phone: this.cartForm.value.phone,
    }
    this._auth.registerOrder(orderData).subscribe(res=>this._auth.getAllOrders());
    this._auth.getAllOrders();
    this._api.cart.next([]);
    this._api.count.next(0);
    // this.router.navigate(['products']);
  }

}
