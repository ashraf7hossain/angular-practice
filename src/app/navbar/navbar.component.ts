import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _api : ApiService , private auth: AuthService, private router: Router) { }
  count:number = 0;
  orderCount: number = 0;
  currentUser:any = {};
  recieved: any = 0;
  @Input() user: any;
  ngOnInit(): void {
    this.auth.currentSingleUser.subscribe(res => {
      this.currentUser = res;
    });
    this.auth.currentOrdersData.subscribe(res => this.orderCount = res.length);
    this._api.currentCount.subscribe((val)=>this.count = val);
    this.auth.currentRecentorder.subscribe(res => this.recieved = res);
  }
  goto(){
    if(this.user.hasOwnProperty('email')){
      this.router.navigate(['user']);
    }else{
      this.router.navigate(['login']);
    }
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
