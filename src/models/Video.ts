import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  preacher: string;
  date: string;
  description: string;
  youtubeId: string;
  category: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    preacher: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    youtubeId: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    publishedAt: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    viewCount: {
      type: String,
      default: '0',
    },
    likeCount: {
      type: String,
      default: '0',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Prevent re-compilation in development
export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema); 