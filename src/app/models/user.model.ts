import { UserRoleModel } from './user.role.model';

export class UserModel {
    userId?: string;
    password?: string;
    fullName?: string;
    createdOn?: string;
    roles: UserRoleModel[] = [];
}
