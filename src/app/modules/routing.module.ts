import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ApplicationDashboardComponent } from '../components/application-dashboard/application-dashboard.component';
import { EnvironmentListComponent } from '../components/environment-list/environment-list.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { UnauthorisedComponent } from '../components/unauthorised/unauthorised.component';
import { AppConstants } from '../constants/app.constants';
import { RouteConstants } from '../constants/route.constants';
import { AuthGuard } from '../gaurds/auth.guard';
import { PermissionGuard } from '../gaurds/permission.guard';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    {
        path: AppConstants.MAIN_ROUTE,
        children: [
            { path: RouteConstants.APPLICATION_DASHBOARD, component: ApplicationDashboardComponent, canActivate: [AuthGuard] },
            { path: RouteConstants.ENVIRONMENT_LIST, component: EnvironmentListComponent, canActivate: [AuthGuard] },
        ],
    },
    { path: 'unauthorised', component: UnauthorisedComponent },
    { path: '**', component: ApplicationDashboardComponent },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [{ provide: APP_BASE_HREF, useValue: '/management-tool' }],
})
export class AppRoutingModule {}
