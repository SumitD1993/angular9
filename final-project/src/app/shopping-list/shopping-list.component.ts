import { Component, OnInit } from '@angular/core';

import { Ingredients } from '../shared/ingredients.module'
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients : Ingredients[] =[];

  constructor(private slService : ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.slService.newIngredientAdded.subscribe(
        (updatedIngs : Ingredients[]) => {
          this.ingredients =updatedIngs;
        }
    )
  }

  updateIngredientList(ingredientToAdd : Ingredients){
    this.ingredients.push(ingredientToAdd);
  }

  onEditIngredient(index : number){
    this.slService.editingIngredientIndex.next(index);
  }

}
