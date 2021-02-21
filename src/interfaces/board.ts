import { IUser } from "./user";

export interface IBoard {
    _id: string;
    title: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}
