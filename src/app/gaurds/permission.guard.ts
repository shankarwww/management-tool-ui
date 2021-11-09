import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/services/security/authorization.service';
import { NotificationService } from '../services/notification/notification.service';

@Injectable({
    providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
    constructor(private router: Router, private authorizationService: AuthorizationService, private notificationService: NotificationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
        return this.hasRequiredPermission(state.url.toString());
    }

    hasRequiredPermission(url: string) {
        const isAuthorized = this.authorizationService.hasRouteAccess(url);
        console.log('The result of url access check is', isAuthorized);
        if (!isAuthorized) {
            this.router.navigate(['unauthorised']);
        }
        return true;
    }
}
