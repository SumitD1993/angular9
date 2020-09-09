import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import  { take, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn : "root"
})
export class AuthGuard implements CanActivate{
    constructor(private authService : AuthService, private router : Router){}
    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean | UrlTree | Promise< boolean | UrlTree > | Observable< boolean | UrlTree>{
        return this.authService.userSub.pipe(
            take(1),
            map(userData => {
                //for second case using tap operator
                // const isAuth = !!userData;
                // return isAuth;

                const isAuth = !!userData;
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(["/auth"]);
            })
            // , tap(isAuth => {
            //     if(!isAuth){
            //         this.router.navigate(['/auth']);
            //     }
            // })

        )
    }
}
