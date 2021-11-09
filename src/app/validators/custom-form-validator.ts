import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class CustomFormValidator {
    validateEmailId(control: AbstractControl) {
        return control.hasError('required')
            ? 'Email is required as user id'
            : control.hasError('email')
            ? 'Not a valid email'
            : control.hasError('LoginIdNotAvailableError')
            ? 'email id already in use'
            : '';
    }

    validatePassword(control: AbstractControl) {
        return control.hasError('required')
            ? 'Password is required'
            : control.hasError('minlength')
            ? 'Password should be minimum 3 characters'
            : control.hasError('maxlength')
            ? 'Password can be of maximum 25 characters'
            : '';
    }
}
