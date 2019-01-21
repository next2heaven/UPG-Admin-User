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
export class GamesService {
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


    
  getGames(){ 
    return this.http.get<Api_result>(environment.api_endpoint+'/games', httpOptions)
      .pipe(map(res => {
        return res;
      }));    
  }


    
  getGame(id){ 
    return this.http.get<Api_result>(environment.api_endpoint+'/games/game/'+id, httpOptions)
      .pipe(map(res => {
        return res;
      }));    
  }

  createGame(){
    return this.http.get<Api_result>(environment.api_endpoint+'/games/create_game', httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }


  saveGame(data){
    console.log(JSON.stringify(data));
    return this.http.post<Api_result>(environment.api_endpoint+'/games/game/save', JSON.stringify(data), httpOptions)
      .pipe(map( res => {
        return res;
      }),
      catchError(this.eh.handleError)
    );
  }
}