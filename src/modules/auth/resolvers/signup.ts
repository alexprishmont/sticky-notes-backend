import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import { User } from '../../../models/user';
import { IUserInputDTO } from '../../../interfaces/userinput';

const saltRounds = 12;

export const signup = async (_: any, userInput: IUserInputDTO) => {
  const { email, password } = userInput;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new UserInputError('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const user = await User.create({
      ...userInput,
      password: hashedPassword,
    });

    user.password = '';

    return user;
  } catch (error) {
    throw error;
  }
};
