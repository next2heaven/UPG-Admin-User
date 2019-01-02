import { ErrorHandlerService } from './../core/error-handler.service';
import { Api_result } from 'src/app/shared/models/api/api.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { httpOptions } from '../core/common.service';

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

  constructor(
    private http:HttpClient,
    private eh:ErrorHandlerService
    ) { }


    
  getSlides(){ 
    return this.http.get<Api_result>(environment.api_endpoint+'/slides', httpOptions)
      .pipe(map(res => {
        return res;
      }));    
  }


    
  getSlide(id){ 
    return this.http.get<Api_result>(environment.api_endpoint+'/slides/slide/'+id, httpOptions)
      .pipe(map(res => {
        return res;
      }));    
  }


  saveSlide(data){
    console.log(JSON.stringify(data));
    console.log(data);
    return this.http.post<Api_result>(environment.api_endpoint+'/slides/slide/save', JSON.stringify(data), httpOptions)
      .pipe(map( res => {
        return res;
      }),
      catchError(this.eh.handleError)
    );
  }


  getMediaLibrary(){ 
    return this.http.get<Api_result>(environment.api_endpoint+'/media/get/slides', httpOptions)
      .pipe(map(res => {
        return res;
      }));    
  }

  saveMedia(data){
    console.log(JSON.stringify(data));
    return this.http.post<Api_result>(environment.api_endpoint+'/media/save', JSON.stringify(data), httpOptions)
      .pipe(map( res => {
        return res;
      }),
      catchError(this.eh.handleError)
    );
  }
}
