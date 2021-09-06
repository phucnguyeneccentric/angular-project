import { AfterViewInit, Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

/** a validator for validate range number */
export function rangeValidator(min: number, max: Number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const outOfRangeNumber =
      control.value < min || control.value > max ? true : false;
    return outOfRangeNumber ? { rangeNumber: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appRangeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RangeValidatorDirective,
      multi: true,
    },
  ],
})
export class RangeValidatorDirective implements Validator {
  @Input()
  minRange!: number;
  @Input()
  maxRange!: number;

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    return rangeValidator(this.minRange, this.maxRange)(control);
  }

}
