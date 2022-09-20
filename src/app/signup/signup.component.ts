import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() { }

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

  }
}
