import { IModel } from './model';
import { IHasUserId } from './hasuser';

export interface INote extends IModel, IHasUserId {
    boardId: string;
    title: string;
    body: string;
}
