import { AuthService } from 'src/app/services/core/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router, 
    private authService:AuthService,
    private auth:AuthService) { }


  canActivate(route, state:RouterStateSnapshot){
    if(this.authService.is_logged_in()) return true;    

    if(state.url!='/login') this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
