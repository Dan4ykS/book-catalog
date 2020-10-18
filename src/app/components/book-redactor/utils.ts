import { FormControl, Validators, ValidatorFn } from '@angular/forms';

import { IBook } from 'src/app/services/interfaces';

export const createFormControl = (...validators: ValidatorFn[]) => new FormControl('', [...validators]);

export const notNewValue = (oldValue: IBook) => {
  return (control: FormControl): { [key: string]: boolean } => {
    for (const key in oldValue) {
      if (oldValue[key] === control.value) {
        return {
          notNew: true,
        };
      }
    }
  };
};
