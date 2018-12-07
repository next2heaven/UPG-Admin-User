import { Api_result } from 'src/app/shared/models/api/api.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { preAuthOptions, httpOptions } from './common.service';
import { ErrorHandlerService } from './error-handler.service';

interface Login_data {
	'email': string,
	'pass': string
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private logged_in:boolean;
	


	constructor(
		private http:HttpClient,
		private route:ActivatedRoute,
		private router:Router,
		private eh:ErrorHandlerService) {    
	 }


	login(form) {
		return this.http.post<Api_result>(environment.api_endpoint+'/auth/user/login', form.value, preAuthOptions)
			.pipe(map( res => {
				if(res.hasOwnProperty('status') && res.status == 'success' && res.data.token){
					// Save Token Locally
					localStorage.setItem('token', res.data.token);

					// Set login state
					this.logged_in = true;

					// Redirect User
					let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
					this.router.navigate([returnUrl || '/dashboard']);

				} else {
					// Set login state
					this.logged_in = false;
				}  
				return res;
			}),
			catchError(this.eh.handleError)
		);
		
	}


	is_logged_in(){
		return this.logged_in;
	}

	check_user($token){
		return this.http.get<Api_result>(environment.api_endpoint+'/auth/user/check', httpOptions).pipe(map(res => {      
			if(res.status == 'success') this.logged_in = true;
			else this.logged_in = false;
			
			return res;
		}));
	}




	register(form){
		return this.http.post<Api_result>(environment.api_endpoint+'/auth/user/register', JSON.stringify(form.value), preAuthOptions)
			.pipe(catchError(this.eh.handleError));
	}

	resetPassword(form){		
		return this.http.post<Api_result>(environment.api_endpoint+'/auth/forgot', JSON.stringify(form.value), preAuthOptions)
			.pipe(catchError(this.eh.handleError));
	}

	updatePass(form){
		return this.http.post<Api_result>(environment.api_endpoint+'/auth/reset', JSON.stringify(form.value), preAuthOptions)
			.pipe(catchError(this.eh.handleError));
	}


	


}