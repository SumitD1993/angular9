import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.module';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn : "root"
})
export class RecipeResolverService implements Resolve<Recipe[]>{
  constructor(private dataStorageService : DataStorageService){}

  resolve(routeSnapshot : ActivatedRouteSnapshot, state : RouterStateSnapshot){
    console.log("Resolver called");
    return this.dataStorageService.fetchReciepes();
  }
}
