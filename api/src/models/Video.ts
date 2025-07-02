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
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    preacher: {
      type: String,
      required: [true, 'Preacher is required'],
      trim: true,
      maxlength: [100, 'Preacher name cannot exceed 100 characters']
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    youtubeId: {
      type: String,
      required: [true, 'YouTube ID is required'],
      unique: true,
      match: [/^[a-zA-Z0-9_-]{11}$/, 'Invalid YouTube ID format']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: ['Sunday Service', 'Prayer Meeting', 'Bible Study', 'Special Event', 'Youth Service'],
      default: 'Sunday Service'
    },
    publishedAt: {
      type: String,
      required: [true, 'Published date is required'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      match: [/^\d+:\d{2}$/, 'Duration must be in MM:SS or HH:MM format']
    },
    viewCount: {
      type: String,
      default: '0',
      validate: {
        validator: function(v: string) {
          return /^\d+$/.test(v);
        },
        message: 'View count must be a valid number string'
      }
    },
    likeCount: {
      type: String,
      default: '0',
      validate: {
        validator: function(v: string) {
          return /^\d+$/.test(v);
        },
        message: 'Like count must be a valid number string'
      }
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

// Indexes for better query performance
VideoSchema.index({ youtubeId: 1 });
VideoSchema.index({ category: 1 });
VideoSchema.index({ isFeatured: 1 });
VideoSchema.index({ publishedAt: -1 });
VideoSchema.index({ createdAt: -1 });

// Pre-save middleware to ensure only one featured video
VideoSchema.pre('save', async function(next) {
  if (this.isFeatured && this.isModified('isFeatured')) {
    // Remove featured status from all other videos
    await mongoose.model('Video').updateMany(
      { _id: { $ne: this._id } },
      { $set: { isFeatured: false } }
    );
  }
  next();
});

const Video = mongoose.model<IVideo>('Video', VideoSchema);

export default Video; 