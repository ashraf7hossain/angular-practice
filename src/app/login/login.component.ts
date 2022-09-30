import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logForm: FormGroup = new FormGroup({});

  constructor(private router: Router , private auth: AuthService) { }
  ngOnInit(): void {
    this.auth.getAll();
    this.logForm = new FormGroup({
      lemail: new FormControl('drkownine123@gmail.com',[Validators.required]),
      lpass : new FormControl('012345678',[Validators.required]),
      lagree : new FormControl(false,[Validators.required]),
    })
  }
  register(){
    this.router.navigate(["/","signup"]);
  }
  login(){
    let logger = {
      email : this.logForm.value.lemail,
      password : this.logForm.value.lpass,
    };
    let ret = this.auth.login(logger);
    if(ret.name === -1){
      console.log(ret.name);
      return;
    }else{
      let obj = [];
      this.auth.currentGetdelivered.subscribe(res => {
        for(let re of res){
          if(re.userId === ret.id){
            this.auth.changeRecentOrder(1);
            break;
          }
        }
      });
      
      this.router.navigate(['products']);
    }
  }

}
