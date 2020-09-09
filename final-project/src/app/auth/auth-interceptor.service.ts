import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
    providedIn : "root"
})

export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService : AuthService){}

    intercept(req : HttpRequest<any>, next : HttpHandler){
        console.log(req.url);
        return this.authService.userSub.pipe(
            take(1),
            exhaustMap(userData => {
                if(!userData){
                    return next.handle(req);
                }else{
                    const modifiedReq = req.clone({params: new HttpParams().set("auth", userData.token)})
                    return next.handle(modifiedReq);
                }
            })
        )

    }

}
