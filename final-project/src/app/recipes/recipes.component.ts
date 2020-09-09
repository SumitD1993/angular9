import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.module';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  // recipeDetailsToShow : Recipe;
  //
  // recipeService : RecipeService;
  // constructor(recipeService : RecipeService) {
  //   this.recipeService = recipeService;
  // }

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe(
    //       (recipe : Recipe) => {
    //         this.recipeDetailsToShow = recipe;
    //       }
    // )
  }
  // onRecepiDetailsToShow(recipe: Recipe){
  //   console.log(recipe);
  //   alert();
  //   this.recepiDetailsToShow= recipe;
  // }
}
