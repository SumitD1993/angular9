import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, UrlSegment, Router } from "@angular/router";
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.module';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  message : string;
  recForm : FormGroup;

  recipeId = null;

  constructor(private activatedRoute : ActivatedRoute, private recipeService : RecipeService, private router : Router) { }

  ngOnInit(): void {
    // this.activatedRoute.url.subscribe(
    //   (url : UrlSegment[]) => {
    //     //  console.log(url);
    //       if(url[0].path == "add"){
    //         this.message = "Add Recipe";
    //         this.editMode = false;
    //       }else{
    //         this.message = "Edit Recipe";
    //         this.editMode = true;
    //         this.recipeId = +params["id"];
    //       }
    //   }
    // );
    this.activatedRoute.params.subscribe(
      (params : Params) => {
        if(params["id"] != null){
          this.message = "Edit Recipe";
          this.editMode = true;
          this.recipeId = +params["id"];
        }else{
          this.message = "Add Recipe";
          this.editMode = false;
        }
        this.initForm();
      }
    )
  }

  initForm(){
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDesc = "";
    let recipeIngredient = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.recipeId);
      recipeName = recipe.name;
      recipeDesc =recipe.description;
      recipeImagePath = recipe.imagePath;

      if(recipe['ingredients']){

        for(let ing of recipe.ingredients){
          recipeIngredient.push(
            new FormGroup({
              name : new FormControl(ing.name, Validators.required),
              amount : new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }//for

      }

    }
    this.recForm = new FormGroup({
      name : new FormControl(recipeName, Validators.required),
      imagePath : new FormControl(recipeImagePath, Validators.required),
      description : new FormControl(recipeDesc, Validators.required),
      ingredients : recipeIngredient
    });
    console.log(this.recForm);
  }

  getIngredientsArr(){
    return (<FormArray>this.recForm.get('ingredients')).controls;
  }

  deleteIngredientFromRecipe(index : number){
    (<FormArray>this.recForm.get('ingredients')).removeAt(index);
  }

  onAddIngredient(){
    (<FormArray>this.recForm.get('ingredients')).push(
      new FormGroup({
        name : new FormControl(null, Validators.required),
        amount : new FormControl(null, Validators.required)
      })
    )
  }

  onSubmit(){
    // const newRecipe = new Recipe(this.recipeId,
    //   this.recForm.value['name'], this.recForm.value['ingredients'],
    //   this.recForm.value['description'],
    //   this.recForm.value['ingredients']
    // );
    const newRecipe :Recipe = this.recForm.value;
    newRecipe.id = this.recipeId;
    this.recipeService.addOrEditRecipe(newRecipe);
    this.onClear();
  }

  onClear(){
    this.recForm.reset();
    (<FormArray>this.recForm.get('ingredients')).clear();
    this.editMode = false;
    this.recipeId = null;
  }

  onCancel(){
    this.router.navigate(['../../'], {relativeTo : this.activatedRoute});
  }
}
