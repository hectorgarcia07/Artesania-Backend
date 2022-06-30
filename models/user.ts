/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose";
import { User, Role } from "../types/user";

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true},
  passwordHash: { type: String, required: true},
  role: {
    type: String,
    enum: [Role.NORMAL, Role.ADMIN],
    required: true
  }
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const res:unknown = returnedObject._id.toString();
    returnedObject.id = res;
    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

export default User;