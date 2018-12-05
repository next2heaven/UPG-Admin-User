import { Api_result } from 'src/app/shared/models/api/api.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {
  private token = localStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer '+this.token,
    })
  };

  constructor(private http:HttpClient) { }

  getSlides(){ 
    return this.http.get<Api_result>(environment.api_endpoint+'/slides', this.httpOptions).pipe(map(res => {
      return res;
    }));
  }
}
