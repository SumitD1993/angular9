import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';


export interface AuthResponseTO{
	  "localId": string;
	  "email": string;
	  "displayName": string;
	  "idToken": string;
	  "refreshToken":string;
	  "expiresIn": string;
	  "registered"?: boolean;
	}

@Injectable({
	providedIn: 'root'
})
export class AuthService{
	userSub = new BehaviorSubject<User>(null);
	logoutTimeout = null;
	constructor(private http : HttpClient){}

	signUp(email: string, password: string){
		return this.http.post<AuthResponseTO>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2ZyHxMEMT6z4glbe_tWFvnK_hsqrGfrg", {
			email : email,
			password : password,
			returnSecureToken: true
		})
		.pipe(catchError(this.handleError),
			tap( authResp => {
				this.saveUserDetailsForApplicationUse(
					authResp.email,
					authResp.localId,
					authResp.idToken,
					+authResp.expiresIn
				)
			})
		);
	}

	login(email: string, password: string){
		return this.http.post<AuthResponseTO>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2ZyHxMEMT6z4glbe_tWFvnK_hsqrGfrg", {
			email : email,
			password : password,
			returnSecureToken: true
		})
		.pipe(catchError(this.handleError),
			tap( authResp => {
				this.saveUserDetailsForApplicationUse(
					authResp.email,
					authResp.localId,
					authResp.idToken,
					+authResp.expiresIn
				)
			})
		);
	}

	logout(){
		localStorage.removeItem("userData");
		this.userSub.next(null);
		clearTimeout(this.logoutTimeout);
	}

	autoLogin(){
		const userLocalData : {
			email:string,
			id : string,
			_token :string,
			_tokenExpiresIn :string
		}= JSON.parse(localStorage.getItem("userData"));
		if(!userLocalData){
			return;
		}

		const userData = new User(
			userLocalData.email,
			userLocalData.id,
			userLocalData._token,
			new Date(userLocalData._tokenExpiresIn)
		);
		this.userSub.next(userData);
	}

	autoLogout(tokenExpiresIn : number){
		this.logoutTimeout = setTimeout( () => {
			this.logout();
		} , tokenExpiresIn * 1000);
	}
	private saveUserDetailsForApplicationUse(email:string, id:string, token: string, tokenExpiresIn:number){
		const expiryDate = new Date(new Date().getTime()+ (tokenExpiresIn * 1000));
		const userData = new User(
			email,
			id,
			token,
			expiryDate
		);
		this.userSub.next(userData);
		localStorage.setItem("userData", JSON.stringify(userData));
		this.autoLogout(tokenExpiresIn);
	}
	private handleError(errorResp : HttpErrorResponse){
		let errorMessage = "An Unknown Error Occurred!";
		if(errorResp.error && errorResp.error.error){
			switch (errorResp.error.error.message) {
				case 'EMAIL_NOT_FOUND':
					errorMessage = "email is not registered!"
					break;
				case 'INVALID_PASSWORD':
					errorMessage = "invalid password"
					break;
				case 'USER_DISABLED':
					errorMessage = "user is been disbaled by administrator"
					break;
				case 'EMAIL_EXISTS':
					errorMessage = "Email id is already registered"
					break;
				case 'OPERATION_NOT_ALLOWED':
					errorMessage = "Sorry! Opreation not allowed"
					break;
				case 'TOO_MANY_ATTEMPTS_TRY_LATER':
					errorMessage = "You have tried for So many times please try after some time"
					break;
			}
		}

		return throwError(errorMessage);
	}
}
