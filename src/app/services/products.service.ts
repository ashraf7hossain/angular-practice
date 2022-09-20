import { Injectable } from '@angular/core';
// import { products } from '../products';
import { Product } from '../product';
import { BehaviorSubject , observable} from 'rxjs';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';




@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  public prods = new BehaviorSubject<any[]>([]);
  private cartCount = new BehaviorSubject<number>(0);
  private cart = new BehaviorSubject<Product[]>([]);

  currentProducts = this.prods.asObservable();
  currentCount = this.cartCount.asObservable();
  currentCart = this.cart.asObservable();

  products:any = []
  constructor(firestore: Firestore) { 
    let collect = collection(firestore, 'food_items');
    this.currentProducts = collectionData(collect);
    this.currentProducts.subscribe(data => {
      this.prods.next(data);
    })

  }

  getProducts():BehaviorSubject<any[]>{
    return this.prods;
  }
  deleteProduct(id:number){
  }
  quant:number = 0;
  changequantity(id:number, val: number){
    let newProducts:any = [];
    this.currentProducts.subscribe(data =>{
      let findId = data.findIndex(d => d.id === id);
      data[findId].quantity += val;
      console.log(data);
      this.prods.next(data);
    });
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
