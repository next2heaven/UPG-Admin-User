import { fade } from './../../animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-forgot',
	templateUrl: './forgot.component.html',
	styleUrls: ['./forgot.component.css'],
	animations: [ fade ]
})
export class ForgotComponent implements OnInit {
	myForm: FormGroup;
	error_msg:String;
	finalMessage:String;
	
	submitSuccess:Boolean = false;
	success: Boolean = false;
	loading: Boolean = false;

	
	constructor(
		private fb:FormBuilder, 
		private auth:AuthService, 
		private router:Router,
		private route:ActivatedRoute) {

	}

	ngOnInit(){
		this.myForm = this.fb.group({
			email:['dave@next2heaven.com', [
				Validators.required,
				Validators.email
			]]
		});
	}



	// GETs
	get email(){
		return this.myForm.get('email');
	}

	


	submitNewPass(){
		if(this.myForm.valid){
			this.loading = true;
			this.auth.resetPassword(this.myForm).subscribe( res => {
				if(res.status == 'success'){
					this.submitSuccess = true;
					this.finalMessage = res.data.message;
				
				} else {
					// Show error message
					if(res.data.message) this.error_msg = res.data.message;
					this.loading = false;
				}
			}, error => {
				this.error_msg = error;         
				this.loading = false;
			}); 
		}
	}
}
