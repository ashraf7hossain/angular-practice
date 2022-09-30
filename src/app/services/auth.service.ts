import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { AngularFireAuth } from '@angular/fire/auth';
import { map , BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  userData = new BehaviorSubject<any[]>([]);
  singleUser = new BehaviorSubject<any>({});
  ordersData = new BehaviorSubject<any>([]);
  getDelivered = new BehaviorSubject<any[]>([]);
  recendOrder = new BehaviorSubject<number>(0);

  currentUserData = this.userData.asObservable();
  currentSingleUser = this.singleUser.asObservable();
  currentOrdersData = this.ordersData.asObservable();
  currentGetdelivered = this.getDelivered.asObservable();
  currentRecentorder = this.recendOrder.asObservable();



  registerUser(user:any){
    return this.http.post<any>(`${environment.baseURL}/users.json` , user);
  }
  registerOrder(order:any){
    return this.http.post<any>(`${environment.baseURL}/orders.json` , order);
  }

  getAllOrders(){
    this.http.get<any>(`${environment.baseURL}/orders.json`)
    .pipe(
      map( (res) => {
        const orders:any = [];
        for(const key in res){
          if(res.hasOwnProperty(key)){
            orders.push({...res[key] , id: key});
          }
        }
        return orders;
      })
    ).subscribe(res => this.ordersData.next(res));
  }
  getAllDeliverd(){
    this.http.get<any>(`${environment.baseURL}/deliverd.json`)
    .pipe(
      map( (res) => {
        const delivered:any = [];
        for(const key in res){
          if(res.hasOwnProperty(key)){
            delivered.push({...res[key] , id: key});
          }
        }
        return delivered;
      })
    ).subscribe(res => this.getDelivered.next(res));
  }

  getAll(){
    this.http.get<any>(`${environment.baseURL}/users.json`)
    .pipe(
      map( (res) => {
        const users:any = [];
        for(const key in res){
          if(res.hasOwnProperty(key)){
            users.push({...res[key] , id: key});
          }
        }
        return users;
      })
    ).subscribe(res => this.userData.next(res));
  }
  Login(){

  }
  login(user:any){
    let tempUsers:any[] = [];
    this.currentUserData.subscribe((res)=>{
      tempUsers = res;
    });
    let returnEmail = tempUsers.findIndex((data:any) =>{
      if(data.email === user.email && data.password === user.password){
        return true;
      }
      return false
    });
    if(returnEmail !== -1){
      this.singleUser.next(tempUsers[returnEmail]);
      return tempUsers[returnEmail];
    }else{
      return {name: -1};
    }
  }
  logout(){
    this.singleUser.next({});
  }
  changeRecentOrder(val:number){
    this.recendOrder.next(1);
  }
}
