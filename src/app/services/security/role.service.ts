import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrls } from 'src/app/constants/app.urls';
import { UserRoleModel } from 'src/app/models/user.role.model';

@Injectable({ providedIn: 'root' })
export class AssignRoleService {
    constructor(private http: HttpClient) {}

    assignRole(model: UserRoleModel): Observable<any> {
        return this.http.post<any>(AppUrls.assignRoleUrl, model);
    }
}
