import { AbstractControl } from '@angular/forms';

export const passwordValidator = (control: AbstractControl) => {
  const regex: RegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (!regex.test(control.value)) {
    return { passwordValidator: { valid: false } };
  }
  return null;
};

export const emailValidator = (control: AbstractControl) => {
  const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(control.value)) {
    return { emailValidator: { valid: false } };
  }
  return null;
};
