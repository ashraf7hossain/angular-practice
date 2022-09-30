import { Injectable } from '@angular/core';
// import { products } from '../products';
import { Product } from '../product';
import { BehaviorSubject , Observable, observable , map} from 'rxjs';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';




@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  public prods = new BehaviorSubject<any[]>([]);
  private cartCount = new BehaviorSubject<number>(0);
  private cart = new BehaviorSubject<Product[]>([]);

  currentProducts = this.prods.asObservable();
  currentProducts2 = this.prods.asObservable();
  currentCount = this.cartCount.asObservable();
  currentCart = this.cart.asObservable();

  products:any = []
  constructor(private fs: Firestore, private auth: Auth) { 
    // let collect = collection(firestore, 'food_items');
    // this.currentProducts = collectionData(collect);
  }
  Login(){
    // this.auth.
  }
  getProducts():Observable<any[]>{
    let collect = collection(this.fs,'food_items');
    return collectionData(collect);
  }
  deleteProduct(id:number){
  }
  quant:number = 0;
  changequantity(id:number, val: number){
    let newProducts:any = [];
    let findId = -1;
    this.currentProducts.subscribe(data =>{
      // findId = data.findIndex(d => d.id === id);
      newProducts = data;
    });
    findId = newProducts.findIndex((d:any) => d.id === id);
    console.log(newProducts);
    newProducts[findId].quantity += val;
    // console.log(data[findId].quantity);
    this.prods.next(newProducts);
    // for(let product of newProducts){
    //   if(product.id === id){
    //     product.quantity += val;
    //     console.log(product.quantity);
    //   }
    // }
    // this.prods.next(newProducts);

  }
  addToCart(id:number){
    let items:Product[] = [];
    let currentItems  = this.currentCart.subscribe((data)=>{
      items = data;
    });
    // let findId = products.findIndex((d) => d.id === id);
    let existId = items.findIndex(d => d.id === id);
    if(existId !== -1){
      // items[existId] = products[findId];
    }else{
      // items.push(products[findId]);
    }
    this.cart.next(items);
  }
}
