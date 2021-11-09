import { Injectable } from '@angular/core';
import { AuthorizationConstants } from 'src/app/constants/authorization.constants';
import { SecuredUrlsConstants } from 'src/app/constants/secured.urls.constant';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    constructor(private storageService: StorageService) {}

    hasPermission() {
        const roles: string[] = this.storageService.getPersistent('user_details').roles;
        console.log('In hasPermission with roles', roles);
        if (roles) {
            for (const role of roles) {
                for (const value of AuthorizationConstants.UpdateGroup) {
                    if (role === value) {
                        console.log('Required role found', role);
                        return true;
                    }
                }
            }
        }
        console.log('Required role not found !!!');
        return false;
    }

    hasRouteAccess(route: string) {
        if (!this.storageService.getPersistent('access_token')) {
            console.log('user not logged in, so return true');
            return true;
        }

        const roles: string[] = this.storageService.getPersistent('user_details').roles;
        if (roles.indexOf('ROLE_ADMIN') > -1) {
            for (const element of SecuredUrlsConstants.AdminSecureUrls) {
                if (route.indexOf(element) > -1) {
                    return true;
                }
            }
            return false;
        } else if (roles.indexOf('ROLE_SUPER_ADMIN') > -1) {
            for (const element of SecuredUrlsConstants.SuperAdminSecureUrls) {
                if (route.indexOf(element) > -1) {
                    return true;
                }
            }
            return false;
        } else {
            const mergedUrls = [...SecuredUrlsConstants.SuperAdminSecureUrls, ...SecuredUrlsConstants.AdminSecureUrls];
            for (const element of mergedUrls) {
                if (route.indexOf(element) > -1) {
                    return false;
                }
            }
        }
        return true;
    }
}
