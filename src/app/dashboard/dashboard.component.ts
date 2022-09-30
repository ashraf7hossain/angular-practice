import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("updateForm") updForm: any = "";
  @ViewChild("userForm") userForm: any = "";

  productForm : FormGroup = new FormGroup({});
  baseURL:string = "https://angular-firebase-7520f-default-rtdb.firebaseio.com/";
  items: any[] = [];
  currentProduct: any = "";
  currentId:any = "";
  search: string = "";
  users:any[] = [];
  searchUser:string = "";
  prendingOrders:any[] = [];

  constructor(private http: HttpClient , 
              private _api: ApiService , 
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this._api.currentProducts.subscribe(res => this.items = res);
    this.auth.currentUserData.subscribe(res => {
      this.users = res;
    });
    this.auth.currentOrdersData.subscribe(res => this.prendingOrders = res);
    
    this.users = this.users.map((user)=>{
      let ret = this.prendingOrders.filter(order => order.userId === user.id).length;
      return {...user,order: ret}
    })
    console.log( " users ",this.users);

    this.productForm = new FormGroup({
      pname : new FormControl(''),
      pprice: new FormControl(''),
      pavail: new FormControl(''),
      pimage: new FormControl('')
    });
  }

  ngAfterViewInit(){
    
  }


  onSubmit(){
    this.http.post(`${this.baseURL}/products.json`,
    {
      name: this.productForm.value['pname'],
      price: this.productForm.value['pprice'],
      available: this.productForm.value['pavail'],
      img: this.productForm.value['pimage'],
      quantity: 0
    }
    ).subscribe((res)=>{
      this._api.getData();
    });
    this.productForm.reset();
  }

  deleteIt(obj:any,name:string){
    let conf = confirm("Do You really want to delete this item");
    if( conf === true){
      this.http.delete(`${this.baseURL}/${name}/${obj.id}.json`)
      .subscribe(res => this._api.getData());
      this.items = this.items.filter(d => d.id !== obj.id);
    }
    this._api.getData();
    this._api.getUsers();
  }
  Modal(id:number){
    let findId = this.items.findIndex((d:any) => d.id === id);
    this.currentProduct = this.items[findId];
    this.currentId = id;
    this.updForm.setValue({
      uname: this.currentProduct.name,
      uprice: this.currentProduct.price,
      uquant: this.currentProduct.available,
      uurl: this.currentProduct.img,
    })
  }
  
  updateStatus(formValue: any){
    let sendingValues = {
      name : formValue.uname,
      price : formValue.uprice,
      available : formValue.uquant,
      img : formValue.uurl,
    };
    console.log(this.currentId);
    this.http.put(`${this.baseURL}/products/${this.currentId}.json`,sendingValues)
    .subscribe(res => this._api.getData());
  }
  goto(id:string){
    this.router.navigate(['order',id]);
  }
  deliver(){
    
  }
}
