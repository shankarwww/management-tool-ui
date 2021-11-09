import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/internal/operators/timeout';
import { catchError } from 'rxjs/internal/operators/catchError';
import { StorageService } from '../services/storage/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private timeOutTime = 50000;

    constructor(private storageService: StorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handleAccess(request, next));
    }

    private handleAccess(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storageService.getPersistent('access_token');

        if (token != null && !(request.url.endsWith('/signup') || request.url.endsWith('/token'))) {
            console.log('token added to header as', token, 'for the url', request.url);
            let changedRequest = request;
            // HttpHeader object immutable - copy values
            const updatedHeaders: { [name: string]: string | string[] } = {};

            for (const key of request.headers.keys()) {
                updatedHeaders[key] = request.headers.getAll(key) ?? '';
            }
            if (token) {
                updatedHeaders['Authorization'] = 'Bearer ' + token;
            }
            const newHeader = new HttpHeaders(updatedHeaders);
            console.log('merged header', newHeader);

            changedRequest = request.clone({
                headers: newHeader,
            });

            return next.handle(changedRequest).pipe(
                timeout(this.timeOutTime),
                catchError((err) => {
                    throw err;
                })
            );
        }

        return next.handle(request).pipe(
            timeout(this.timeOutTime),
            catchError((err) => {
                throw err;
            })
        );
    }
}
