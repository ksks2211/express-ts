import mongoose, { Schema } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

const postSchema = new Schema({
  writer: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hashtags: [{ type: ObjectId, ref: "Hashtag" }],
});

export default mongoose.model("Post", postSchema);
