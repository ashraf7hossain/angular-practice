import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private auth: AuthService , private router: Router, private http: HttpClient) { }
  currentUser: any = {};
  passwordOk: boolean = false;
  oldPassword:string = "a";
  recentOrder:any = {};
  total:number = 0;
  updateForm:FormGroup = new FormGroup({});


  ngOnInit(): void {
    this.auth.currentSingleUser.subscribe(res =>{
      this.currentUser = res;
      console.log(this.currentUser);
      this.oldPassword = res.password;
    });


    this.auth.currentGetdelivered.subscribe(res => {
      this.recentOrder = res.find(re => re.userId === this.currentUser.id);
      this.total = this.recentOrder.items.reduce((a:any , b:any) => (a + b.quantity * b.price),0);
      this.total += this.total * 0.5 + this.total * 0.15;
      this.auth.changeRecentOrder(1);
    });


    this.updateForm = new FormGroup({
      userName: new FormControl(),
      userEmail: new FormControl(''),
      userPassword: new FormControl('')
    });

  }
  check(e:any){
    this.passwordOk = this.oldPassword === e.target.value;
    console.table(typeof e.target.value);
    console.table(typeof this.oldPassword);
    console.log(this.passwordOk);
    }

  updateInfo(){
    let name = this.updateForm.value['userName'];
    let email = this.updateForm.value['userEmail'];
    let password = this.updateForm.value['userPassword'];
    let sendingValues = {
      name: (name === '' || name === null) ? this.currentUser.name: name,
      email: (email === '' || email === null) ? this.currentUser.email: email,
      password: (password === '' || password === null) ? this.currentUser.password:password,
      role: this.currentUser.role
    }
    this.updateForm.reset(); 
    console.log(this.currentUser.id);
    console.log(sendingValues);
    this.http.put<any>(`${environment.baseURL}/users/${this.currentUser.id}.json`,sendingValues).subscribe(res => {
      this.currentUser.name = sendingValues.name;
      this.currentUser.password = sendingValues.password;
      this.currentUser.email = sendingValues.email;
      this.auth.getAll();
    });
  }
  
  remove(){
    console.log(this.recentOrder.id);
    this.http.delete<any>(`${environment.baseURL}/deliverd/${this.recentOrder.id}.json`).subscribe(res =>{
      this.auth.getAllDeliverd();
      this.auth.changeRecentOrder(0)
    });
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/products']);
  }

}
