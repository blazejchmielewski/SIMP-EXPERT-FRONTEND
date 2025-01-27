import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../../auth/store/auth.actions'
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router, private store: Store){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable <boolean | UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean 
    | UrlTree {
    return this.authService.isLoggedIn().pipe(
      take(1),
      map((resp)=>{
        const isLoggedIn = resp.message;
        if(isLoggedIn){
          
          //this.logout();
          return true;
        }
        return true;
      }),
      catchError((err)=>{
        this.router.navigate(['/no-access']);
        return of(true);
      })
    )
  }

  private logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
