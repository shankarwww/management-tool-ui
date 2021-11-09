import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private notification: BehaviorSubject<string> = new BehaviorSubject('');
    readonly notification$: Observable<string> = this.notification.asObservable();

    notifyMessage(message: string) {
        console.log('notification msg received in the service', message);
        this.notification.next(message);
    }

    notify(error: any) {
        console.log('notification error received in the service', error);
        if (error instanceof HttpErrorResponse) {
            const message = `${error.status} - ${error.error.error} | ${error.error.message ? error.error.message : error.error.error_description}`;
            this.notification.next(message);
        } else {
            this.notification.next(error);
        }
    }
}
