import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity:0 }),
        animate(500, style({ opacity:1 }))
      ]),
      transition('* => void', [
        style({ opacity:1 }),
        animate(500, style({ opacity:0 }))
      ]),
    ])
  ]
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  forgotForm: FormGroup;

  success: Boolean = false;
  loading: Boolean = false;
  
  constructor(private fb:FormBuilder) {
    
  }

  ngOnInit(){
    this.myForm = this.fb.group({
      email:['', [
        Validators.required,
        Validators.email
      ]],
      password:['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }



  // GETs
  get email(){
    return this.myForm.get('email');
  }

  get password(){
    return this.myForm.get('password');
  }

  


  submitLogin(){
    this.loading = true;
    if(this.myForm.valid){
      
    } else {
      this.loading = false;
    }
  }

}
