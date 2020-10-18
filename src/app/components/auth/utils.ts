import { FormControl, ValidatorFn, Validators } from '@angular/forms';

export const createEmailControl = (...extraValidators: ValidatorFn[]) =>
  new FormControl('', [Validators.email, Validators.required,  ...extraValidators]);

export const createPasswordControl = (...extraValidators: ValidatorFn[]) =>
  new FormControl('', [Validators.required, Validators.minLength(6), ...extraValidators]);

export const createLogInControl = (...extraValidators: ValidatorFn[]) =>
  new FormControl('', [Validators.required, ...extraValidators]);

