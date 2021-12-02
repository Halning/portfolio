import {
  AbstractControl,
  AbstractControlDirective,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { get } from 'lodash-es';
import { startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

export class ReplayControlValueChanges<T> extends Observable<T> {
  constructor(control: AbstractControl | AbstractControlDirective) {
    super((subscriber) => {
      if (!control.valueChanges) {
        throw new Error('Control does not have valueChanges');
      }

      control.valueChanges.pipe(startWith(control.value)).subscribe(subscriber);
    });
  }
}

// usage
// const value$ = new ReplayControlValueChanges(control);
// value$.subscribe(); // emits control value and the all control valuesChanges

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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (controls[controlName]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (hasRequiredField(controls[controlName])) {
          return true;
        }
      }
    }
  }

  return false;
};
