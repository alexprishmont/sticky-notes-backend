import { IUser } from '../../../interfaces/user';

export const me = async (_: any, args: any, user: { userData: IUser }) => ({
    ...user.userData._doc,
    id: user.userData._id
});
