import { fade } from './../../animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-newpass',
	templateUrl: './newpass.component.html',
	styleUrls: ['./newpass.component.css'],
	animations: [ fade ]
})
export class NewpassComponent implements OnInit {
	myForm: FormGroup;
	error_msg:String;
	temp_pass:String;

	submit_but_label:String = 'SAVE PASSWORD';
	submitSuccess:Boolean = false;
	success: Boolean = false;
	loading: Boolean = false;

	
	constructor(
		private fb:FormBuilder, 
		private auth:AuthService, 
		private route:ActivatedRoute,
		private router:Router) {			
	}

	ngOnInit(){
		this.temp_pass = this.route.snapshot.queryParamMap.get('p');

		this.myForm = this.fb.group({
			new_password:['', [
				Validators.required,
				Validators.minLength(6)
			]],
			temp_pass:[this.temp_pass]
		});
	}



	// GETs
	get new_password(){
		return this.myForm.get('new_password');
	}

	


	submitNewPass(){
		if(this.myForm.valid){
			this.loading = true;
			this.auth.updatePass(this.myForm).subscribe( res => {
				if(res.status == 'success'){
					this.submitSuccess = true;
					this.submit_but_label = 'Updated Successfully';
					this.loading = false;
					setTimeout(() => {
						this.router.navigate(['/login']);
					}, 2000);

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
