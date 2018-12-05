import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html', 
	styleUrls: ['./login.component.css'],
	animations: [
		trigger('fade', [
			state('void', style({ opacity:0 })),
			transition(':enter, :leave', [
				animate(500)
			])
		])
	]
})
export class LoginComponent implements OnInit {
	myForm: FormGroup;
	error_msg:String;

	success: Boolean = false;
	loading: Boolean = false;
	screenLoading:Boolean = true;

	
	constructor(
		private fb:FormBuilder, 
		private auth:AuthService, 
		private router:Router,
		private route:ActivatedRoute) {

		// redirect if already logged in
		if(localStorage.getItem('token')>''){
			this.auth.check_user(localStorage.getItem('token')).subscribe(res => {
				if(res.status == 'success'){
					let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
					this.router.navigate([returnUrl || '/member']);
					
				} else {
					localStorage.setItem('token', '');
					this.screenLoading = false;
				}
			});
		} else this.screenLoading = false;
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
		if(this.myForm.valid){
			this.loading = true;
			this.auth.login(this.myForm).subscribe( res => {
				if(res.status != 'success'){
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
