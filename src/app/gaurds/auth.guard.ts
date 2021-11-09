import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { NotificationService } from '../services/notification/notification.service';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService, private storageService: StorageService, private notificationService: NotificationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('AuthGuard called for route ', route);
        if (this.storageService.getPersistent('access_token')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.loginService.logout();
        this.notificationService.notify('Session has expired !!! So redirecting to login page');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url, session_validity: false } });
        return false;
    }
}
