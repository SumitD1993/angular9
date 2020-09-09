import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeDetails:Recipe;

  constructor(private recipeService : RecipeService,private activatedRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params : Params) =>
      {
        this.recipeDetails = this.recipeService.getRecipe(+params["recipeId"]);
      }
    )
  }

  onAddIngredientsToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipeDetails.ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.recipeDetails);
    this.router.navigate(["/recipes"]);
  }

}
