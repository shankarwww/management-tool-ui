import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SubscriberModel } from 'src/app/models/subscriber.model';
import { CreateSubscriptionComponent } from 'src/app/popups/create-subscriber/create-subscriber.component';
import { CreateEnvironmentComponent } from 'src/app/popups/create-environment/create-environment.component';
import { ApplicationService } from 'src/app/services/application.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
import { RouteConstants } from 'src/app/constants/route.constants';
import { AppConstants } from 'src/app/constants/app.constants';
import { UserRoleModel } from 'src/app/models/user.role.model';

@Component({
    selector: 'app-application-dashboard',
    templateUrl: './application-dashboard.component.html',
    styleUrls: ['./application-dashboard.component.scss'],
})
export class ApplicationDashboardComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    subscribers?: SubscriberModel[];
    isSuperAdmin = false;

    displayedColumns: string[] = ['subscriberId', 'type', 'description', 'createdOn', 'updatedOn', 'updatedBy', 'active', 'environments', 'add'];
    dataSource!: MatTableDataSource<any>;

    constructor(private router: Router, private dialog: MatDialog, private service: ApplicationService, private storageService: StorageService) {}

    ngOnInit(): void {
        const role = this.storageService.getPersistent('user_role');
        console.log('user role is', role);
        this.isSuperAdmin = role?.role === 'ROLE_SUPER_ADMIN';

        this.getDataFromService();
    }

    private getDataFromService() {
        const userId = this.storageService.getPersistent('user_details').userId;
        this.service.getAllApplications(userId).subscribe((data) => {
            console.log('application list is', data);
            this.subscribers = data;
            this.dataSource = new MatTableDataSource(data);
        });
    }

    createSubscription() {
        this.dialog
            .open(CreateSubscriptionComponent, {
                data: { model: new SubscriberModel(), title: 'New Subscriber Creation', editAllowed: true, buttonTitle: 'Create' },
                width: '550px',
                disableClose: true,
            })
            .afterClosed()
            .subscribe((action) => {
                console.log('the dialog action is', action);
                this.getDataFromService();
            });
    }

    createEnvironment(row: SubscriberModel) {
        console.log('going to create environment for', row);
        this.dialog
            .open(CreateEnvironmentComponent, {
                data: { model: row, title: 'Create Environment', editAllowed: true, buttonTitle: 'Create' },
                width: '550px',
                disableClose: true,
            })
            .afterClosed()
            .subscribe((action) => {
                console.log('the dialog action is', action);
                this.getDataFromService();
            });
    }

    showEnvironments(row: SubscriberModel) {
        const route = AppConstants.MAIN_ROUTE_PATH + RouteConstants.ENVIRONMENT_LIST;
        console.log('navigating to route', route);
        this.storageService.setPersistent('selected_row', row);
        this.router.navigate([route]);
    }

    editRow(row: SubscriberModel) {
        console.log('going to edit row is', row);
        //const editAllowed = this.isAdmin(admins);
        const editAllowed = true;
        console.log('is edit allowed ?', editAllowed);
        this.dialog
            .open(CreateSubscriptionComponent, {
                data: { model: row, title: 'Edit Environment', editAllowed: editAllowed, buttonTitle: 'Update' },
                width: '550px',
                disableClose: true,
            })
            .afterClosed()
            .subscribe((data: string) => {
                console.log('dialog closed with action', data);
            });
    }

    isAdmin(admins: any[]): boolean {
        return true;
    }

    isAdmin1(admins: any[]): boolean {
        const userId = this.storageService.getPersistent('user_details').userId;
        for (let index = 0; index < admins.length; index++) {
            const element = admins[index];
            if (element.emailId === userId) {
                return true;
            }
        }
        return false;
    }

    ngAfterViewInit(): void {
        console.log('after view init called');
        if (this.dataSource) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
