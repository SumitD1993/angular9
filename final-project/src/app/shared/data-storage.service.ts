import { Injectable } from "@angular/core";
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.module';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn : "root"
})
export class DataStorageService{

    constructor(
            private reciepeService : RecipeService,
            private http : HttpClient,
            private authService:AuthService
        ) {
              this.reciepeService.recipeListUpdatedSub.subscribe( reciepe => {
                  if(!this.reciepeService.recipeFetched){
                      this.saveRecipes();
                  }
              })
          }

	// uppdated with git desktop


    saveRecipes(){
        this.http.put("https://angular9-recipe-book.firebaseio.com/recipes.json",
                            this.reciepeService.recipes
                      ).subscribe();
    }

    fetchReciepes(){
        return this.http.get<Recipe[]>("https://angular9-recipe-book.firebaseio.com/recipes.json")
                  .pipe(
                    map(recipes => {
                      let recipeArr: Recipe[] = [];
                      let index = 1;
                      for (let recipe of recipes) {
                        recipe.id = index;
                        if (!recipe.ingredients) {
                          recipe.ingredients = [];
                        }
                        recipeArr.push(recipe);
                        index++;
                      }
                      this.reciepeService.nextId = index - 1;
                      return recipes;
                    }),
                    tap(recipes => {
                      this.reciepeService.setRecipes(recipes);
                    })
                  );
    }
}
