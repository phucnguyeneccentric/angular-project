import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
  // providers: [ShoppingListService]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput')
  nameInputRef!: ElementRef;

  @ViewChild('amountInput')
  amountInputRef!: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  addIngredient() {
    const name = this.nameInputRef.nativeElement.value;
    const amount = this.amountInputRef.nativeElement.value;
    const newIngredient: Ingredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
