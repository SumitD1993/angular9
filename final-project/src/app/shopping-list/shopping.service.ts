import { Ingredients } from '../shared/ingredients.module';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingService{
  newIngredientAdded = new EventEmitter<Ingredients[]>();
  editingIngredientIndex = new Subject<number>();

  private ingredients : Ingredients[] =[
    new Ingredients("Apples" , 10),
    new Ingredients("Tomato" , 3)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ing: Ingredients) {
    this.ingredients.push(ing);
    this.newIngredientAdded.emit(this.ingredients.slice());
  }

  editIngredientByIndex(index: number, ing: Ingredients) {
    this.ingredients[index] = ing;
    this.newIngredientAdded.emit(this.ingredients.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]){
    this.ingredients.push(...ingredients);
    this.newIngredientAdded.emit(this.ingredients.slice());
  }

  getIgredientByIndex(index: number): Ingredients {
    return this.ingredients[index];
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.newIngredientAdded.emit(this.ingredients.slice());
  }
}
