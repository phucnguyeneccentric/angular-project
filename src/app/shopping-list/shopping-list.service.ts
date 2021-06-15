import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    ingredientChanged = new EventEmitter<Ingredient[]>();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

    getIngredient() {
        return this.ingredients.slice();
    }
    
    addIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    addIngredients(newIngredients: Ingredient[]) {
        this.ingredients.push(...newIngredients);
        this.ingredientChanged.emit(this.ingredients.slice());
        
    }
}