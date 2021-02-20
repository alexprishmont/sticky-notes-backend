import { AuthenticationError } from 'apollo-server-express';
import { create } from '../../../utils/token';
import { User } from '../../../models/user';
import bcrypt from 'bcrypt';
import { config } from '../../../config';

export const login = async (_: any, userData: { email: string, password: string }) => {
    const { email, password } = userData;

    const user = await User.findOne({
        email
    });

    if (!user) {
        throw new AuthenticationError(`User not found`);
    }

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new AuthenticationError(`Password not valid`);
    }

    const token = create(user._id);

    return {
        user: {
            ...user._doc,
            id: user._id
        },
        token,
        tokenExpiration: config.jwt.lifetime
    }
};