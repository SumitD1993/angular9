import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.gaurd';

const appRouter : Routes = [
  {path : "", redirectTo : "/recipes", pathMatch : "full"},
  {path : "recipes", component : RecipesComponent, canActivate :  [AuthGuard],
    children : [
        {path : "", component : RecipesStartComponent, pathMatch:"full"},
        {path : "recipe-item-details/:recipeId",component: RecipeDetailsComponent, resolve : [RecipeResolverService]},
        {path : "edit/:id" , component : RecipeEditComponent,  resolve : [RecipeResolverService]},
        {path : "add", component : RecipeEditComponent}
    ]
  },
  { path : "shopping-list", component : ShoppingListComponent },
  {path : "auth", component : AuthComponent},
  {path : "**", redirectTo : 'notFound'},
  {path : "notFound", component : PageNotFoundComponent}

]

@NgModule({
  imports :  [RouterModule.forRoot(appRouter), ReactiveFormsModule],
  exports : [RouterModule, ReactiveFormsModule]
})
export class AppRoutingModule{

}
