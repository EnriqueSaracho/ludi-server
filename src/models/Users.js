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
  queue: [
    {
      // If an ObjectId is needed
      // gameId: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "games",
      //   required: true,
      // },
      gameId: {
        type: Number,
        required: true,
      },
      position: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Creating 'UserModel' for 'users' MongoDB collection, using 'UserSchema'.
export const UserModel = new mongoose.model("users", UserSchema);
