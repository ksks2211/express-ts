import mongoose, { Schema, Types } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

export interface IHashtag {
  title: string;
  posts: Types.ObjectId[];
}

const hashtagSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  posts: [{ type: ObjectId, ref: "Post" }],
});

export default mongoose.model("Hashtag", hashtagSchema);
