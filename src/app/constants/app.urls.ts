import { environment } from 'src/environments/environment';

export class AppUrls {
    public static server = environment.server;

    public static registerUrl: string = AppUrls.server + '/signup';
    public static tokenUrl: string = AppUrls.server + '/token';
    public static getApplicationByNameUrl: string = AppUrls.server + `/application/${name}`;
    public static getAllApplicationsUrl: string = AppUrls.server + '/applications';
    public static getEnvironmentTypeUrl: string = AppUrls.server + '/environmenttypes';
    public static createSubscriptionUrl: string = AppUrls.server + '/createapplication';
    public static updateApplicationUrl: string = AppUrls.server + '/updateapplication';
    public static createEnvironmentUrl: string = AppUrls.server + '/createenvironment';
    public static updateEnvironmentUrl: string = AppUrls.server + '/updateenvironment';
    public static getAllEnvironmentsUrl: string = AppUrls.server + '/allenvironments';
    public static assignRoleUrl: string = AppUrls.server + '/assignrole';
}
