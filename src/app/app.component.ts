import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { LoginObserverService } from './services/observers/login-observer.service';
import { StorageService } from './services/storage/storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    isLoggedIn = false;

    constructor(private loginObserverService: LoginObserverService, private storageService: StorageService, private router: Router) {}

    ngOnInit(): void {
        this.monitorRouting();

        //
        const userModel = this.storageService.getPersistent('user_details');
        console.log('user details is', userModel);
        if (userModel != null && this.storageService.getPersistent('access_token')) {
            this.loginObserverService.setLoginFlagToTrue();
            this.loginObserverService.setCurrentUserName(userModel.userId);
            console.log('will stay login');
        }

        this.loginObserverService.isLoggedIn().subscribe((data) => {
            this.isLoggedIn = data;
        });
    }

    private monitorRouting(): void {
        this.router.events.subscribe((event: Event) => {
            // console.log( event );
            if (event instanceof NavigationEnd) {
                console.log('Navigating to url', event.url);
                if (event.url === '/') {
                    console.log('since the user hit the /, so logging him out');
                    // this.loginService.logout();
                }
                // check for browser reload
                if (event.id === 1 && event.url === event.urlAfterRedirects) {
                    const user = this.storageService.getPersistent('user_details');
                    this.loginObserverService.setCurrentUserName(user?.userId);
                }
            }
        });
    }
}
