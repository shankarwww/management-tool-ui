import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrls } from '../constants/app.urls';
import { EnvironmentTypeModel } from '../models/environment-type.model';
import { EnvironmentModel } from '../models/environment.model';
import { SubscriberModel } from '../models/subscriber.model';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
    constructor(private http: HttpClient) {}

    getApplicationsByName(name: string): Observable<SubscriberModel> {
        return this.http.get<SubscriberModel>(AppUrls.server + `/application/${name}`);
    }

    getEnvironmentType(): Observable<EnvironmentTypeModel[]> {
        return this.http.get<SubscriberModel[]>(AppUrls.getEnvironmentTypeUrl);
    }

    getAllApplications(userId: string): Observable<SubscriberModel[]> {
        return this.http.get<SubscriberModel[]>(AppUrls.getAllApplicationsUrl, { params: { userId: userId } });
    }

    createSubscription(model: SubscriberModel): Observable<any> {
        return this.http.post<any>(AppUrls.createSubscriptionUrl, model);
    }

    updateApplication(model: SubscriberModel): Observable<any> {
        return this.http.post<any>(AppUrls.updateApplicationUrl, model);
    }

    createEnvironment(appModel: EnvironmentModel): Observable<any> {
        return this.http.post<any>(AppUrls.createEnvironmentUrl, appModel);
    }

    getAllEnvironments(userId: string, subscriberId: string): Observable<EnvironmentModel[]> {
        return this.http.get<EnvironmentModel[]>(AppUrls.getAllEnvironmentsUrl, {
            params: { userId: userId, subscriberId: subscriberId },
        });
    }

    updateEnvironment(appModel: SubscriberModel): Observable<any> {
        return this.http.post<any>(AppUrls.updateEnvironmentUrl, appModel);
    }
}
