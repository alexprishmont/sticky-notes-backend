import { IModel } from './model';
import { IHasUserId} from './hasuser';

export interface IBoard extends IModel, IHasUserId {
    title: string;
}
