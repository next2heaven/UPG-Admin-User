import { Api_result } from 'src/app/shared/models/api/api.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { httpOptions } from './common.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http:HttpClient,
    private eh:ErrorHandlerService) { }

  getAccount(){ 
    return this.http.get<Api_result>(environment.api_endpoint+'/users/me', httpOptions).pipe(map(res => {
      return res;
    }));
  }


  saveProfile(form){
    return this.http.post<Api_result>(environment.api_endpoint+'/users/update/me', form.value, httpOptions)
      .pipe(map( res => {
        return res;
      }),
      catchError(this.eh.handleError)
    );
  }


  saveProfilePhoto(url){
    return this.http.post<Api_result>(environment.api_endpoint+'/users/update/photo', {
      avatar_url:url
    }, httpOptions).pipe(map( res => {
        return res;
      }),
      catchError(this.eh.handleError)
    );
  }



  updatePass(form){
    return this.http.post<Api_result>(environment.api_endpoint+'/users/update/pass', form.value, httpOptions)
      .pipe(map( res => {
        return res;
      }),
      catchError(this.eh.handleError)
    );
  }

  
}
