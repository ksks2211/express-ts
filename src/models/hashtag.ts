import mongoose, { Schema } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

const hashtagSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  posts: [{ type: ObjectId, ref: "Post" }],
});

export default mongoose.model("Hashtag", hashtagSchema);
