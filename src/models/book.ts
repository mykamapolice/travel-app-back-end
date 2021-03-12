import mongoose, { Schema } from 'mongoose';
import IBook from '../interfaces/books';

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    extraInformation: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

BookSchema.post<IBook>('save', function () {
  this.extraInformation = 'This is some extra info';
});

export default mongoose.model<IBook>('Book', BookSchema);
