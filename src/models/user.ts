import mongoose, { Schema, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  nick: string;
  password: string;
  provider: string;
  snsId?: string;
  profile?: string;
  createdAt: Date;
  posts: Types.ObjectId[];
  followedBy: Types.ObjectId[];
  following: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
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
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  followedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("User", userSchema);
