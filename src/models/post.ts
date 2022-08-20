import mongoose, { Schema, Types } from "mongoose";

export interface IPost {
  _id: Types.ObjectId;
  writer: Types.ObjectId;
  content: string;
  img?: string;
  createdAt: Date;
  hashtags: Types.ObjectId[];
}
const {
  Types: { ObjectId: SchemaObjectId },
} = Schema;

const postSchema = new Schema<IPost>({
  writer: {
    type: SchemaObjectId,
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
  hashtags: [{ type: SchemaObjectId, ref: "Hashtag" }],
});

export default mongoose.model("Post", postSchema);
