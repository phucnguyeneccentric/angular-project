import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipes.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Bò lá lốt',
      'Bò nướng lá lốt là món ăn vặt đường phố vô cùng nổi tiếng mà chắc chắn rằng rất nhiều người trong chúng ta đã từng thử qua',
      'https://cdn.beptruong.edu.vn/wp-content/uploads/2018/05/bo-nuong-la-lot.jpg',
      [new Ingredient('Thịt bò (kg)', 1), new Ingredient('Lá lốt (kg)', 1)]
    ),
    new Recipe(
      'Mực nhồi thịt',
      'món mực dồn thịt chiên giòn là một món ăn tuyệt vời giúp bạn làm mới thực đơn. Với vị đậm đà của thịt, vị dai mềm của mực ắt hẳn sẽ khiến bạn không thể nào rời dừng đũa được đấy! ',
      'https://cdn.cet.edu.vn/wp-content/uploads/2019/06/muc-don-thit-chien-gion.jpg',
      [new Ingredient('Mực (kg)', 2), new Ingredient('Thịt ba chỉ (kg)', 1)]
    ),
    new Recipe(
      'Ốc bươu xào tiêu xanh',
      'Một món ăn cực kỳ “tốn cơm” với vị cay cay của tiêu xanh, vị thơm đặc trưng từ nghệ tươi, tỏi băm khi xào chung với ốc lác càng dậy vị hấp dẫn. Thử ngay chờ chi Mẹ ơi!',
      'https://monngonmoingay.com/wp-content/uploads/2021/03/oc-buou-xao-tieu-xanh-500.jpg',
      [new Ingredient('Ốc lác (g)', 400), new Ingredient('Tiêu xanh (g)', 30)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipe(index: number) {
    // const recipe = this.recipes[index];
    // return of(recipe);
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
