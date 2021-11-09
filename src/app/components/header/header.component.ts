import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoginObserverService } from 'src/app/services/observers/login-observer.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    isLoggedIn = false;
    userName!: string;

    constructor(private loginObserverService: LoginObserverService, private storageService: StorageService, private loginService: LoginService, private router: Router) {}

    ngOnInit(): void {
        this.loginObserverService.isLoggedIn().subscribe((data) => {
            this.isLoggedIn = data;
        });

        this.loginObserverService.getCurrentUserName().subscribe((data) => {
            this.userName = data;
        });
        console.log('username in header is', this.userName);
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['/login']);
    }

    gotoRegister() {
        this.router.navigate(['/registration']);
    }

    gotoLogin() {
        this.router.navigate(['/login']);
    }
}
