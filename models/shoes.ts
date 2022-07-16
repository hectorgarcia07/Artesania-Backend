import mongoose from "mongoose";
import { Shoe, Size, Gender, Age } from '../types/shoe';

//individual sizes of a shoe
const sizeSchema = new mongoose.Schema<Size>({
  size: { type: Number, required: [true, 'Size is required']},
  quantity: { type: Number, required: [true, 'Quantity is required']}
});

//Will contain 
const shoeSchema = new mongoose.Schema<Shoe>({
  url: { type: String, required: [true, 'Url is required'] },
  name: { type: String, required: [true, 'Name is required'] },
  color: { type: String, required: [true, 'Color is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  gender: { type: String, enum: Object.values(Gender), required: [true, 'Gender is required'] },
  age: { type: String, enum: Object.values(Age), required: [true, 'Age is required']},
  sizes: [sizeSchema],
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