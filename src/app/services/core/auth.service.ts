import { Api_result } from 'src/app/shared/models/api/api.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Login_data {
	'email': string,
	'pass': string
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private logged_in:boolean;
	private options = { headers: new HttpHeaders().set('Content-Type', 'text/plain') };
	private token = localStorage.getItem('token');
	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json',
			'Authorization': 'Bearer '+this.token,
		})
	};


	constructor(
		private http:HttpClient,
		private route:ActivatedRoute,
		private router:Router) {    
	 }


	login(form) {
		return this.http.post<Api_result>(environment.api_endpoint+'/auth/user/login', form.value, this.options)
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
			catchError(this.handleError)
		);
		
	}


	is_logged_in(){
		return this.logged_in;
	}

	check_user($token){
		return this.http.get<Api_result>(environment.api_endpoint+'/auth/user/check', this.httpOptions).pipe(map(res => {      
			if(res.status == 'success') this.logged_in = true;
			else this.logged_in = false;
			
			return res;
		}));
	}




	register(form){
		return this.http.post<Api_result>(environment.api_endpoint+'/auth/user/register', JSON.stringify(form.value), this.options)
			.pipe(catchError(this.handleError));
	}

	resetPassword(form){		
		return this.http.post<Api_result>(environment.api_endpoint+'/auth/forgot', JSON.stringify(form.value), this.options)
			.pipe(catchError(this.handleError));
	}

	updatePass(form){
		return this.http.post<Api_result>(environment.api_endpoint+'/auth/reset', JSON.stringify(form.value), this.options)
			.pipe(catchError(this.handleError));
	}


	



	
	private handleError(error: HttpErrorResponse) {
		if(!environment.production){
			if (error.error instanceof ErrorEvent) {
				// A client-side or network error occurred. Handle it accordingly.
				console.error('An error occurred:', error.error.message);
			} else {
				// The backend returned an unsuccessful response code.
				// The response body may contain clues as to what went wrong,
				console.error(
					`Backend returned code ${error.status}, ` +
					`body was: ${error.error}`);
			}
		}
		// return an observable with a user-facing error message
		return throwError('Site not responding. Please try again later.');
	};

}