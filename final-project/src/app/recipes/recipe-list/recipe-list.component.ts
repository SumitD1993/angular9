import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{

  recipes : Recipe[] = [];
  recipeListSubscription : Subscription;

  constructor(private recipeService : RecipeService){}


  ngOnInit(): void {
    this.recipeListSubscription = this.recipeService.recipeListUpdatedSub.subscribe((recipeArr : Recipe[]) => {
      this.recipes = recipeArr;
    });
    this.recipes = this.recipeService.recipes;
  }

  ngOnDestroy(){
    this.recipeListSubscription.unsubscribe();
  }
}
