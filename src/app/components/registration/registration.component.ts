import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomErrorStateMatcher } from 'src/app/error/error.state.matcher';
import { UserModel } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
    form!: FormGroup;
    matcher = new CustomErrorStateMatcher();
    isSuccess = false;

    constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private registrationService: RegistrationService) {
        this.loginService.logout();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            userId: ['', [Validators.required, Validators.email]],
            fullName: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
        });
    }

    register() {
        const model: UserModel = this.form.getRawValue();
        console.log('registration from data is', model);

        this.registrationService.signUp(model).subscribe((status) => {
            console.log('is registered ?', status);
            this.isSuccess = status;
        });
    }

    getEmailErrorMessage() {}

    getPasswordErrorMessage() {}

    getConfirmPasswordErrorMessage() {}
}
