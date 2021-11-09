import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { RouteConstants } from 'src/app/constants/route.constants';
import { UserModel } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { LoginObserverService } from 'src/app/services/observers/login-observer.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { CustomErrorStateMatcher } from '../../error/error.state.matcher';
import { CustomFormValidator } from '../../validators/custom-form-validator';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    matcher = new CustomErrorStateMatcher();
    loginForm!: FormGroup;
    passwordHide = true;
    isLoading$!: Observable<boolean>;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private customFormValidator: CustomFormValidator,
        private loginObserverService: LoginObserverService,
        private loginService: LoginService,
        private storageService: StorageService
    ) {
        this.loginService.logout();
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userId: ['superadmin@gmail.com', [Validators.required, Validators.email]],
            // userId: ['', [Validators.required, Validators.email]],
            password: ['1212', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
        });
    }

    login() {
        //this.isLoading = true;
        const uname = this.loginForm.get('userId')?.value;
        const pwd = this.loginForm.get('password')?.value;

        console.log('username for login is', uname);

        const model = new UserModel();
        model.userId = uname;

        this.loginService
            .obtainAccessToken(uname, pwd)
            .pipe(
                concatMap((token) =>
                    this.loginService.saveToken(token).pipe(
                        tap(() => this.loginService.saveUserDetails(token)),
                        tap(() => this.loginObserverService.setCurrentUserName(uname)),
                        tap(() => this.loginObserverService.setLoginFlagToTrue())
                    )
                )
            )

            .subscribe(
                () => this.router.navigate([RouteConstants.APPLICATION_DASHBOARD]),
                (error) => {
                    // this.isLoading = false;
                    console.log('error while login', error);
                    throw error;
                }
            );
    }

    getEmailErrorMessage() {
        return this.customFormValidator.validateEmailId(this.loginForm?.get('userId') as FormGroup);
    }

    getPasswordErrorMessage() {
        return this.customFormValidator.validatePassword(this.loginForm?.get('password') as FormGroup);
    }
}
