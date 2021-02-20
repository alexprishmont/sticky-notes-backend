import { getDecodedToken } from './token';
import { Request } from 'express';
import { User } from '../models/user';
import { IToken } from 'interfaces/token';

const tokenHeaderName: string = 'x-token';

export const getUser = async (req: Request) => {
    if (!req) {
        return null;
    }

    const tokenHeader = req.get(tokenHeaderName);
    if (!tokenHeader) {
        return null;
    }

    try {
        const decodedToken = await getDecodedToken(tokenHeader);
        return await User.findOne({ _id: (decodedToken as IToken).userId });
    } catch (error) {
        return null;
    }
}