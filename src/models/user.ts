import { IUser } from 'interfaces/user';
import mongoose from 'mongoose';

const userSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const User = mongoose.model<IUser & mongoose.Document>('User', userSchema);