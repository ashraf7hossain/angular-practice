import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("updateForm") updForm: any = "";

  productForm : FormGroup = new FormGroup({});
  baseURL:string = "https://angular-firebase-7520f-default-rtdb.firebaseio.com/";
  items: any[] = [];
  currentProduct: any = "";
  currentId:any = "";

  constructor(private http: HttpClient , private _api: ApiService) { }

  ngOnInit(): void {

    this._api.currentProducts.subscribe(res => this.items = res);

    this.productForm = new FormGroup({
      pname : new FormControl(''),
      pprice: new FormControl(''),
      pavail: new FormControl(''),
      pimage: new FormControl('')
    });
  }
  onSubmit(){
    console.log("ok");
    console.log(this.productForm.value);
    this.http.post(`${this.baseURL}/products.json`,
    {
      name: this.productForm.value['pname'],
      price: this.productForm.value['pprice'],
      available: this.productForm.value['pavail'],
      img: this.productForm.value['pimage'],
      quantity: 0
    }
    ).subscribe((res)=>{
      console.log(res);
    });
    this.productForm.reset();
  }

  deleteItem(id:number){
    let conf = confirm("Do You really want to delete this item");
    if( conf === true){
      this.http.delete(`${this.baseURL}/products/${id}.json`)
      .subscribe(res => console.log("successfully deleted"));
      this.items = this.items.filter(d => d.id !== id);
    }
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
    .subscribe(res => console.log("product succesfully updated"));
  }

}
