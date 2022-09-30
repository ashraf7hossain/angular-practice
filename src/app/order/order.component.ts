import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(private route: ActivatedRoute, private auth: AuthService, private http: HttpClient, private _api: ApiService) { }
  userId:string | null = "";
  orders:any = [];
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.userId = id;
    this.auth.currentOrdersData.subscribe((res)=>{
      this.orders = res.filter((order:any) => order.userId === this.userId);
    });
  }

  deliver(id:string, obj:any){
    this.http.delete<any>(`${environment.baseURL}/orders/${id}.json`).subscribe(res => {
      this.auth.getAllOrders();
      this.auth.getAllDeliverd();
      // this.auth.changeRecentOrder(1);
    });
    let topost = {
      userId: obj.userId,
       items: obj.item,
       date: new Date(),
    }
    this.http.post<any>(`${environment.baseURL}/deliverd.json`,topost).subscribe(res => {
      console.log("successfully post");
    });
    for(let it of obj.item){
      this.http.put<any>(`${environment.baseURL}/products/${it.id}.json`,{...it,available: it.available - it.quantity , quantity: 0}).subscribe(
        res => {
          this._api.getData();
        }
      )
    }

    // console.log(topost);
  }

}
