import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity:0 })),
      transition(':enter, :leave', [
        animate(500)
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  error_msg:String;
  show_reg_form:Boolean = true;
  show_reg_success:Boolean = false;
  reg_success_message:String;

  success: Boolean = false;
  loading: Boolean = false;

  
  constructor(
    private fb:FormBuilder, 
    private auth:AuthService) {
  }

  ngOnInit(){
    this.myForm = this.fb.group({
      fname:['', [ Validators.required ]],
      lname:['', [ Validators.required ]],
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
  get fname(){ return this.myForm.get('fname'); }
  get lname(){ return this.myForm.get('lname'); }
  get email(){ return this.myForm.get('email'); }
  get password(){ return this.myForm.get('password'); }
  get password_conf(){ return this.myForm.get('password_conf'); }

  


  submitReg(){    
    if(this.myForm.valid){
      this.loading = true;
      this.auth.register(this.myForm).subscribe( res => {
        if(res.status == 'success'){
          this.reg_success_message = res.data.message;
          this.show_reg_form = false;
          this.show_reg_success = true;

        } else {
          // Show error message
          if(res.data.message) this.error_msg = res.data.message; 
          this.loading = false;
        }
      },
      error => {
        this.error_msg = error;         
        this.loading = false;
      }); 
    }
  }
}
