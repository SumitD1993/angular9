import { Component } from "@angular/core";
import { NgForm } from "@angular/forms"
import { AuthService, AuthResponseTO } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector : "app-auth",
  templateUrl : "./auth.component.html"
})
export class AuthComponent{
  isLoginMode = false;
  error: string = null;
  isLoading: boolean = false;

    constructor(private authService : AuthService, private router: Router){

	}
  onSubmit(authForm : NgForm){
      this.error = null;
      if(!authForm.valid){
          return;
      }
      let responseObservable : Observable<AuthResponseTO> = null;
      const email = authForm.value.email;
      const password = authForm.value.password;
      this.isLoading = true;
      if(this.isLoginMode){
          responseObservable = this.authService.login(email, password);
      }else{
          responseObservable = this.authService.signUp(email, password);
      }

      responseObservable.subscribe(response => {
          console.log(response);
          this.isLoading = false;
          this.router.navigate(['/']);
      }, errorMessage => {
          this.error = errorMessage
          this.isLoading = false;
      })
  }
}
