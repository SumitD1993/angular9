import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.module';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingrForm : NgForm;
  index : number = 0;
  editMode = false;
  editIndexSubscription :  Subscription;
  editedItem : Ingredients;

  constructor(private slService : ShoppingService) { }

  ngOnInit(): void {
    this.editIndexSubscription = this.slService.editingIngredientIndex.subscribe((index : number) => {
      this.editMode = true;
      this.index = index;
      this.editedItem = this.slService.getIgredientByIndex(index);
      this.ingrForm.setValue({
              name : this.editedItem.name,
              amount : this.editedItem.amount
          });
    } );
  }
  onAddOrEditIngredient(form :NgForm){
    const value = form.value;
    const ing : Ingredients = new Ingredients(value.name, value.amount);
    if(!this.editMode){
      this.slService.addIngredient(ing);
    }else{
      this.slService.editIngredientByIndex(this.index, ing);
    }
    this.ingrForm.reset();
    this.editMode = false;
  }

  ondeleteIngredient(){
    this.slService.deleteIngredient(this.index);
    this.ingrForm.reset();
    this.editMode = false;
    this.index = null;
  }
  onformClear(){
    this.ingrForm.reset();
    if(this.editMode){
      this.editMode = false;
    }
    this.index = null;
  }

  ngOnDestroy(){
    this.editIndexSubscription.unsubscribe();
  }
}
