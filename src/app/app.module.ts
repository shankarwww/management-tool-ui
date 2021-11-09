import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ApplicationDashboardComponent } from './components/application-dashboard/application-dashboard.component';
import { CreateSubscriptionComponent } from './popups/create-subscriber/create-subscriber.component';
import { AppRoutingModule } from './modules/routing.module';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistrationComponent } from './components/registration/registration.component';
import { UnauthorisedComponent } from './components/unauthorised/unauthorised.component';
import { HeaderComponent } from './components/header/header.component';
import { CustomErrorHandler } from './error/error.handler';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { CreateEnvironmentComponent } from './popups/create-environment/create-environment.component';
import { EnvironmentListComponent } from './components/environment-list/environment-list.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        ApplicationDashboardComponent,
        CreateSubscriptionComponent,
        RegistrationComponent,
        UnauthorisedComponent,
        CreateEnvironmentComponent,
        EnvironmentListComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, MaterialModule, ReactiveFormsModule, HttpClientModule, FlexLayoutModule, FormsModule],
    providers: [
        {
            provide: ErrorHandler,
            useClass: CustomErrorHandler,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
