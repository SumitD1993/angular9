import { Ingredients } from '../shared/ingredients.module';

export class Recipe{
  public id : number;
  public name : string;
  public description : string;
  public imagePath : string;
  public ingredients : Ingredients[];

  constructor(id : number, name:string, desc:string, imgUrl:string, ingredients : Ingredients[]){
    this.id = id;
    this.name = name;
    this.description =desc;
    this.imagePath = imgUrl;
    this.ingredients = ingredients;
  }
}
