import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constants/app.constants';
import { RouteConstants } from 'src/app/constants/route.constants';
import { EnvironmentModel } from 'src/app/models/environment.model';
import { SubscriberModel } from 'src/app/models/subscriber.model';
import { ApplicationService } from 'src/app/services/application.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
    selector: 'app-environment-list',
    templateUrl: './environment-list.component.html',
    styleUrls: ['./environment-list.component.scss'],
})
export class EnvironmentListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    environments?: EnvironmentModel[];

    displayedColumns: string[] = ['subscriberId', 'environmentId', 'url', 'publicKey', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'active'];
    dataSource!: MatTableDataSource<EnvironmentModel>;

    constructor(private router: Router, private storageService: StorageService, private service: ApplicationService) {}

    ngOnInit(): void {
        const model = this.storageService.getPersistent('selected_row');

        this.service.getAllEnvironments(model.userId, model.subscriberId).subscribe((data) => {
            console.log('the environments are', data);
            this.environments = data;
            this.dataSource = new MatTableDataSource(data);
        });
    }

    gotoDashboard(): void {
        this.router.navigate([AppConstants.MAIN_ROUTE_PATH + RouteConstants.APPLICATION_DASHBOARD]);
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
