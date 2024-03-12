import mongoose, { Schema } from "mongoose";

type ArticleSchema = {
  uniqueId: string;
  title: string;
  content: string;
  author: string;
};

const ArticleSchema = new Schema<ArticleSchema>(
  {
    uniqueId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ArticleModel =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);

export default ArticleModel;
