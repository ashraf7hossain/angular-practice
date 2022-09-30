import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService ,private router: Router) { }

  myForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.myForm = new FormGroup({
      uname : new FormControl('Ashraf',Validators.required),
      uemail : new FormControl('',[Validators.email,Validators.required]),
      upass : new FormControl('',[Validators.required,Validators.min(8)]),
      vpass : new FormControl('',[Validators.required,Validators.min(8)]),
    })
  }
  onSubmit(){
    console.log(this.myForm.value.uemail);
    let user = {
      name : this.myForm.value.uname,
      email : this.myForm.value.uemail,
      password : this.myForm.value.upass,
      role: "user"
    };
    this.auth.registerUser(user)
    .subscribe(res => console.log(res));
    this.auth.getAll();
    this.router.navigate(['/login']);
    this.myForm.reset();
  }
}
