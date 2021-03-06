import mongoose from 'mongoose';
import { INote } from '../interfaces/note';

const noteSchema: mongoose.Schema = new mongoose.Schema({
  boardId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    required: false,
    default: false,
  }
}, { timestamps: true });

export const Note = mongoose.model<INote & mongoose.Document>('Note', noteSchema);
