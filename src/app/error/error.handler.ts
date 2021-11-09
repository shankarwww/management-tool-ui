import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {}

    handleError(error: HttpErrorResponse): void {
        console.error('Error has occured and is detected by framework');
        console.error(error);
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        window.alert(errorMessage);
    }

    handleError1(error: Error | HttpErrorResponse): void {
        console.error('Error has occured and is detected by framework');
        console.error(error);
        let errorDescription: any = null;

        if (error instanceof HttpErrorResponse) {
            // Server error happened
            if (!navigator.onLine) {
                // No Internet connection
                console.error('there seems to be no internet connection', navigator);
                errorDescription = 'Communication failed. Please check Internet Connection';
            } else if (error.status === 0) {
                // No backend server connection
                errorDescription = 'Failed to connect to backend java server.Please check sevice availability';
            } else if (error.status === 401) {
                // No backend server connection
                errorDescription = `${error.status} - ${error.error.error} | ${error.error.message ? error.error.message : error.error.error_description}`;
            } else {
                errorDescription = error;
            }
            console.log('There seems to be Http error:', navigator);
        } else {
            console.log('In else of all error block');
            errorDescription = 'Opps !!! Something went wrong | ' + error.message;
        }

        console.error('The error description is', errorDescription);
        alert(errorDescription);
    }
}
