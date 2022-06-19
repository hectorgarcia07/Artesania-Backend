/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose";
import UserType from "../types/user";

const userSchema = new mongoose.Schema<UserType>({
  username: { type: String, required: true},
  passwordHash: { type: String, required: true}
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

export default User;