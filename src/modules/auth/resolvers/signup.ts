import { UserInputError } from 'apollo-server-express';
import { User } from '../../../models/user';
import bcrypt from 'bcrypt';
import { IUserInputDTO } from '../../../interfaces/userinput';

const saltRounds = 12;

export const signup = async (_: any, userInput: IUserInputDTO) => {
    const { email, password } = userInput;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new UserInputError(`User already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const user = await User.create({
            ...userInput,
            password: hashedPassword
        });

        return {
            name: user.name,
            email: user.email,
            id: user._id,
            password: null
        }
    } catch (error) {
        throw error;
    }
}