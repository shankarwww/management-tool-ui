import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppUrls } from '../constants/app.urls';
import { UserModel } from '../models/user.model';
import { UserRoleModel } from '../models/user.role.model';
import { LoginObserverService } from './observers/login-observer.service';
import { StorageService } from './storage/storage.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private http: HttpClient, private storageService: StorageService, private loginObserverService: LoginObserverService) {}

    obtainAccessToken(userId: string, password: string): Observable<any> {
        console.log('Going to obtain AccessToken for', userId);
        return this.http.post(AppUrls.tokenUrl, { userId: userId, password: password });
    }

    saveToken(token: any): Observable<boolean> {
        console.log('Obtained Access token', token);
        this.storageService.setPersistent('access_token', token.token);
        return of(true);
    }

    saveUserDetails(token: any) {
        const tokenDecoded = atob(token.token.split('.')[1]);
        const tokenJson = JSON.parse(tokenDecoded);
        console.log('token json', tokenJson);

        const role = new UserRoleModel();
        role.role = tokenJson.scopes;

        const user = new UserModel();
        user.userId = tokenJson.sub;
        user.roles.push(role);

        this.storageService.setPersistent('user_details', user);
        this.storageService.setPersistent('user_role', role);
        return of(true);
    }

    logout() {
        this.loginObserverService.setLoginFlagToFalse();

        // remove user from local storage to log user out
        this.storageService.delPersistent('access_token');
        this.storageService.delPersistent('user_details');
        this.storageService.delPersistent('user_role');
        this.loginObserverService.setLoginFlagToFalse();
        console.log('project storage cleaned');
    }
}
