import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    userSubscription : Subscription;
   constructor(private dataStorageService: DataStorageService, private authService : AuthService,
                private router : Router) { }

   ngOnInit(){
       this.userSubscription = this.authService.userSub.subscribe(user => {
           this.isAuthenticated = !!user;  //  !user means if user is null true and extra ! means false and if user is object then user is ture and !user is false and extra ! makes it false from true
       })
   }
  onsaveRecipes() {
    this.dataStorageService.saveRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchReciepes().subscribe();
  }

  onLogout(){
      this.authService.logout();
      this.router.navigate(['/auth']);
  }
  ngOnDestroy(){
      this.userSubscription.unsubscribe();
  }
}
