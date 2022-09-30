import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AtuhGuard implements CanActivate {
  
  constructor(private auth: AuthService) { }

  canActivate():boolean {
     let currentUser:any = {};
     this.auth.currentSingleUser.subscribe(
      (res) => {
        currentUser = res;
        // console.log(res);
      }
     );
     console.log("Current User",currentUser.name);
     if(currentUser.role === "admin"){
      return true;
     }else{
      return false;
     }
  }
  
}
