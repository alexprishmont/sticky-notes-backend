import mongoose from 'mongoose';
import { IBoard } from '../interfaces/board';

const boardSchema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
}, { timestamps: true });

export const Board = mongoose.model<IBoard & mongoose.Document>('Board', boardSchema);
