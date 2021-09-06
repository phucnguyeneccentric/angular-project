import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
  // providers: [ShoppingListService]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form!: NgForm;
  minAmount = 1;
  maxAmount = 10;
  editMode = false;
  editedIndexNumber!: number;
  editedItem!: Ingredient;

  subscription!: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedIndexNumber = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const newIngredient: Ingredient = new Ingredient(
      this.form.value.name,
      this.form.value.amount
    );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedIndexNumber,
        newIngredient
      );
      this.editMode = false;
      this.snackBar.open(
        `Nguyên liệu ${newIngredient.name} đã được cập nhật`,
        'OK',
        { duration: 3000 }
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
      this.snackBar.open(
        `Nguyên liệu ${newIngredient.name} đã được thêm vào danh sách`,
        'OK',
        { duration: 3000 }
      );
    }

    // clear form values and all validations after submit
    this.form.resetForm();
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedIndexNumber);
    }
    this.onClear();
  }

  onClear() {
    this.form.resetForm();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
