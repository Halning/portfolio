import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { get } from 'lodash-es';

export function markAsTouchedAllControls(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach((field: string) => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched();
      control.updateValueAndValidity();
    } else if (control instanceof FormGroup) {
      markAsTouchedAllControls(control);
    }
  });
}


export const hasRequiredField = (abstractControl: AbstractControl): boolean => {
  if (!abstractControl) {
    return false;
  }

  if (abstractControl.validator) {
    const validator = abstractControl.validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }

  const controls = get(abstractControl, 'controls', null);

  if (controls) {
    for (const controlName of controls) {
      if (controls[controlName]) {
        if (hasRequiredField(controls[controlName])) {
          return true;
        }
      }
    }
  }

  return false;
};
