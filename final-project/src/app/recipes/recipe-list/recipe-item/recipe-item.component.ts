import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.module';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  // @Input() id: any;

  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
    // console.log(this.recipe);
    // console.log(this.id)
  }
}
