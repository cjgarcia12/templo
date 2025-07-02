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
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      default: 'No description provided',
    },
    category: {
      type: String,
      required: true,
      enum: ['Worship', 'Community', 'Youth', 'Special'],
    },
    googleEventId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents with null values
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Prevent re-compilation in development
export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema); 