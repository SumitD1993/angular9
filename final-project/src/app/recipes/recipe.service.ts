import { Recipe } from './recipe.module';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.module';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { map } from 'rxjs/operators';

@Injectable()
export class RecipeService implements OnInit{
  recipeSelected = new EventEmitter<Recipe>();
  nextId = null;
  recipeListUpdatedSub = new Subject<Recipe[]>();
  recipeFetched = true;
  //  selectedRecipe: Recipe;
  //
  // setSelectedId(id: number) {
  //   this.selectedRecipe = this.recipes[id];
  //   console.log(id);
  // }

  // recipes : Recipe[] = [
  //   new Recipe(1, "Vadapav", "This Is A Mumbai vadapav very amongst who like soicy food", "https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2019/Cheesy_Vada_Pav_Recipe_Britannia_Cheesy_Kitchen_Recipe_Video_20_1600.jpg",
  //   [
  //       new Ingredients('potato', 2),
  //       new Ingredients('Besan', 4),
  //       new Ingredients('Onion', 1)
  //   ]),
  //   new Recipe(2, "Basubdi", "Sweet Drink which fills you with joy.", "https://cdn2.foodviva.com/static-content/food-images/dessert-recipes/basundi/basundi.jpg",
  //   [
  //       new Ingredients('Milk', 1),
  //       new Ingredients('Sugar', 4),
  //       new Ingredients('Ilayachi', 3)
  //   ])
  // ];

  recipes : Recipe[] = [];

  constructor(private shoppingService : ShoppingService){}

  ngOnInit(): void {
    // this.dataStorageService.fetchReciepes().subscribe(recipes  => {
    //   console.log(recipes);
    // });
  }

  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.recipeFetched = true;
    this.recipeListUpdatedSub.next(this.recipes.slice());
    console.log(this.nextId);
  }

  addIngredientsToShoppingList(ingredients : Ingredients[]){
    this.shoppingService.addIngredientsToShoppingList(ingredients);
  }

  getRecipe(id: number) {
    const recipe = this.recipes.find(
      (r) => {
        return r.id === id;
      }
    );
    return recipe;
  }

  addOrEditRecipe(newRecipe: Recipe) {
    if(newRecipe.id === null || newRecipe.id === 0){
      const id = this.getNextId();
      newRecipe.id = id;
      this.recipes.push(newRecipe);
    }else{
        for(let i = 0 ; i < this.recipes.length; i++){
          if(this.recipes[i].id === newRecipe.id){
            this.recipes[i] = newRecipe;
            break;
          }
        }
    }
    this.recipeFetched = false;
    this.recipeListUpdatedSub.next(this.recipes.slice());
  }

  getNextId(){
    this.nextId++;
    return this.nextId;
  }

  deleteRecipe(recipeDetails: Recipe) {
    let index = null;
    for(let i = 0 ; i < this.recipes.length; i++){
      if(this.recipes[i].id === recipeDetails.id){
          index = i ;
          break;
      }
    }
    if(index != null){
      this.recipes.splice(index, 1);
      this.recipeFetched = false;
      this.recipeListUpdatedSub.next(this.recipes.slice());
    }
  }
}
