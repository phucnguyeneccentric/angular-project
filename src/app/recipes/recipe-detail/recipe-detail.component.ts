import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  @Input()
  recipe!: Recipe;
  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    // this.recipe = this.recipeService.getRecipe();
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
