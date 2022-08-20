import mongoose, { Schema } from "mongoose";
const {
  Types: { ObjectId },
} = Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nick: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
    default: "local",
  },
  snsId: {
    type: String,
  },
  profile: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  posts: [{ type: ObjectId, ref: "Post" }],
  followedBy: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});

export default mongoose.model("User", userSchema);
