import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginObserverService {
    private loginFlag = new BehaviorSubject<boolean>(false);

    private messageSource = new BehaviorSubject<string>('');
    private currentMessage = this.messageSource.asObservable();

    constructor() {
        console.log('LoginObserverService constructor loaded');
    }

    setLoginFlagToTrue() {
        this.loginFlag.next(true);
    }

    setLoginFlagToFalse() {
        this.loginFlag.next(false);
    }

    isLoggedIn() {
        return this.loginFlag.asObservable();
    }

    setCurrentUserName(data: string) {
        this.messageSource.next(data);
    }

    getCurrentUserName() {
        return this.currentMessage;
    }
}
