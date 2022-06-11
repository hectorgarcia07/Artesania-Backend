import mongoose from "mongoose";
import { Shoe, Size } from '../types/shoe';

//individual sizes of a shoe
const sizeSchema = new mongoose.Schema<Size>({
  size: Number,
  quantity: Number
});

//Will contain 
const shoeSchema = new mongoose.Schema<Shoe>({
  name: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'unixex'], required: true },
  sizes: [sizeSchema]
});

shoeSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const res:unknown = returnedObject._id.toString();
    returnedObject.id = res;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

sizeSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const res:unknown = returnedObject._id.toString();
    returnedObject.id = res;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default {
  Shoe: mongoose.model<Shoe>('Shoe', shoeSchema)
};