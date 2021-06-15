import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipes.model";

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('Bò lá lốt',
            'Món bò cuốn lá lốt ngon mê ly',
            'https://cdn.beptruong.edu.vn/wp-content/uploads/2018/05/bo-nuong-la-lot.jpg',
            [
                new Ingredient('Thịt bò (kg)', 1),
                new Ingredient('Lá lốt (kg)', 1),
            ]),
        new Recipe('Mực nhồi thịt',
            'món mực nhồi thịt chiên giòn',
            'https://cdn.cet.edu.vn/wp-content/uploads/2019/06/muc-don-thit-chien-gion.jpg',
            [
                new Ingredient('Mực (kg)', 2),
                new Ingredient('Thịt ba chỉ (kg)', 1),
            ])
    ];

    constructor(private shoppingListService: ShoppingListService){};

    getRecipe() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}