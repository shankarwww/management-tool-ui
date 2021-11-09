import { EnvironmentModel } from './environment.model';

export class SubscriberModel {
    subscriberId?: string;
    userId?: string;
    type?: string;
    description?: string;
    createdOn?: Date;
    updatedBy?: string;
    updatedOn?: Date;
    active?: boolean;
    environments?: EnvironmentModel[] = [];
}
