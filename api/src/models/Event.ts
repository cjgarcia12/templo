import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  category: 'Worship' | 'Community' | 'Youth' | 'Special';
  googleEventId?: string; // To track original Google Calendar event ID
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: false,
      default: 'No description provided',
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Worship', 'Community', 'Youth', 'Special'],
        message: 'Category must be one of: Worship, Community, Youth, Special'
      },
    },
    googleEventId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents with null values
      trim: true
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for better query performance
EventSchema.index({ date: 1 });
EventSchema.index({ category: 1 });
EventSchema.index({ googleEventId: 1 });
EventSchema.index({ createdAt: -1 });

const Event = mongoose.model<IEvent>('Event', EventSchema);

export default Event; 