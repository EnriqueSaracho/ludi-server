// Importing mongoose module to file.
import mongoose from "mongoose";

// Creating 'UserSchema' schema.
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Creating 'UserModel' for 'users' MongoDB collection, using 'UserSchema'.
export const UserModel = new mongoose.model("users", UserSchema);
