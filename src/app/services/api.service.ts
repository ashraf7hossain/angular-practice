import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, BehaviorSubject}     from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  Products = new BehaviorSubject<any[]>([]);
  count = new BehaviorSubject<number>(0);
  cart  = new BehaviorSubject<any[]>([]);

  currentProducts = this.Products.asObservable();
  currentCount = this.count.asObservable();
  currentCart = this.cart.asObservable();


  // getData():Observable<any[]>{
  //   return this.http.get<any[]>(`${environment.baseURL}/products.json`);
  // }

  getData(){
    return this.http.get<any[]>(`${environment.baseURL}/products.json`).pipe(
      map( (res) => {
        const products:any = [];
        for(const key in res){
          if(res.hasOwnProperty(key)){
            products.push({...res[key] , id: key});
          }
        }
        return products;
      })
    ).subscribe(res => this.Products.next(res));
    console.log("api service called",this.Products);
  }
  getUsers(){
    
  }

  tempCount = 0;
  changeQuantity(id:number , val: number){
    let newProducts:any = [];
    this.currentProducts.subscribe(res => newProducts = res);
    let findId = newProducts.findIndex((prod: any) => prod.id === id);
    
    if(val === -1 && newProducts[findId].quantity === 1){
      // if(val === - 1 && this.tempCount === 0)return;
      this.tempCount += val;
      this.count.next(this.tempCount);
      return;
    }
    if(val === 1 && newProducts[findId].quantity === newProducts[findId].available){
      return;
    }
    newProducts[findId].quantity += val
    this.tempCount += val;
    this.count.next(this.tempCount);
    this.Products.next(newProducts);
  }

  addToCart(id:number){
    let newProducts:any = [];
    let newCart: any = [];
    this.currentCart.subscribe(res => newCart = res);
    this.currentProducts.subscribe(res => newProducts = res);
    let findId = newProducts.findIndex((prod: any) => prod.id === id);
    let existId = newCart.findIndex((d : any) => d.id === id);
    if(existId === -1){
      newCart.push(newProducts[findId]);
    }else{
      newCart[existId] = newProducts[findId];
    }
    this.tempCount += 1;
    this.count.next(this.tempCount);
    this.cart.next(newCart);
  }


}
