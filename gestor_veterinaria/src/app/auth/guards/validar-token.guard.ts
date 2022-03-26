import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService:AuthService, private router:Router){}


  canActivate(): Observable<boolean> | boolean  {
    return this.authService.validToken().pipe(
      tap(valid=>{
        console.log(valid);
        if(!valid){
          this.router.navigate(['/auth'])
        }
      })
    );
  }
  
  canLoad(): Observable<boolean > | boolean {
    return this.authService.validToken().pipe(
      tap(valid=>{
        console.log(valid);
        if(!valid){
          this.router.navigate(['/auth'])
        }       
      }),
    );
  }
}
