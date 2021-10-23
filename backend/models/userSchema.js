import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  date_joined: {
    type: Date,
    default: Date.now,
  },
  posts: [{
    type: String,
    required: false,
  }],
});

export default mongoose.model("Users", userSchema);
