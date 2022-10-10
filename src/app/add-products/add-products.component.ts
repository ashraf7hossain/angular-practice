import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { isEmpty } from '@firebase/util';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  @ViewChild("updateForm") updForm: any = "";


  allProducts: any[] = [];
  productForm: FormGroup = new FormGroup({});
  search: string = "";
  modalState: string = "";
  modalState2: string = "";
  currentProduct: any = "";
  currentId: any = "";


  constructor(private auth: AuthService, private _api: ApiService, private http: HttpClient, private elem: ElementRef) { }

  ngOnInit(): void {
    this._api.currentProducts.subscribe(res => this.allProducts = res);
    // this.auth.currentUserData.subscribe(res => {
    //   this.users = res;
    // });
    // this.auth.currentOrdersData.subscribe(res => this.prendingOrders = res);

    this.productForm = new FormGroup({
      pname: new FormControl(''),
      pcat: new FormControl(''),
      pprice: new FormControl(''),
      pavail: new FormControl(''),
      pimage: new FormControl('')
    });
  }

  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = `
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems,{});
    `
    this.elem.nativeElement.appendChild(s);
  }


  deleteIt(obj: any, name: string) {
    let conf = confirm("Do You really want to delete this item");
    if (conf === true) {
      this.http.delete(`${environment.baseURL}/${name}/${obj.id}.json`)
        .subscribe(res => this._api.getData());
      this.allProducts = this.allProducts.filter(d => d.id !== obj.id);
    }
    this._api.getData();
    this._api.getUsers();
  }

  modalStatus() {
    if (this.modalState === '') {
      this.modalState = 'active';
    } else {
      this.modalState = '';
    }
  }
  modalStatus2() {
    if (this.modalState2 === '') {
      this.modalState2 = 'active';
    } else {
      this.modalState2 = '';
    }
  }
  submitProduct(event: any) {
    event.preventDefault();
    let data = {
      name: this.productForm.value['pname'],
      category: this.productForm.value['pcat'],
      price: this.productForm.value['pprice'],
      available: this.productForm.value['pavail'],
      img: this.productForm.value['pimage'],
      quantity: 1
    }
    const someEmpty = Object.values(data).some((x:any) =>  x === '');
    if(someEmpty){
      return;
    }
    console.log({someEmpty,data});
    this.http.post(`${environment.baseURL}/products.json`,data).subscribe((res) => {
      this._api.getData();
    });
    this.productForm.reset();
  }
  Modal(id: any) {
    this.modalStatus();
    let findId = this.allProducts.findIndex((d: any) => d.id === id);
    this.currentProduct = this.allProducts[findId];
    this.currentId = id;
    this.updForm.setValue({
      uname: this.currentProduct.name,
      uprice: this.currentProduct.price,
      uquant: this.currentProduct.available,
      uurl: this.currentProduct.img,
    })
  }
  updateStatus(event: any, formValue: any) {
    event.preventDefault();
    let sendingValues = {
      name: formValue.uname,
      price: formValue.uprice,
      available: formValue.uquant,
      img: formValue.uurl,
      quantity: 1
    };
    const someEmpty = Object.values(sendingValues).some((x:any) =>  x === '');
    if(someEmpty){
      return;
    }
    this.http.put(`${environment.baseURL}/products/${this.currentId}.json`, sendingValues)
      .subscribe(res => this._api.getData());
  }
}
