import { IModel } from './model';

export interface IUser extends IModel {
    password: string;
    email: string;
    name: string;
}
