import { Api_result } from 'src/app/shared/models/api/api.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private token = localStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer '+this.token,
    })
  };

  constructor(private http:HttpClient) { }

  userExample(){ 
    return this.http.get<Api_result>(environment.api_endpoint+'/users/user/2', this.httpOptions).pipe(map(res => {
      return res;
    }));
  }
}
