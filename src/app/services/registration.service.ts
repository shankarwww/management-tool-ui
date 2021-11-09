import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AppUrls } from '../constants/app.urls';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
    constructor(private http: HttpClient) {}

    signUp(model: UserModel): Observable<boolean> {
        return this.http.post<boolean>(AppUrls.registerUrl, model);
    }
}
