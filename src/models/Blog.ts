import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true, maxlength: 200 },
    coverImage: { type: String },
    author: { type: String, required: true, default: "Admin" },
    tags: [{ type: String }],
    published: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

// Index for search functionality
BlogSchema.index({ title: "text", content: "text", tags: "text" });

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
