import { HttpHeaders } from '@angular/common/http';

export class AppConstants {
    static readonly MAIN_ROUTE = 'auth';
    static readonly MAIN_ROUTE_PATH = '/' + AppConstants.MAIN_ROUTE + '/';
    //static readonly MAIN_ROUTE_PATH = '/';

    static httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
    };
}
