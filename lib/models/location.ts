import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  name: string;
  building: string;
  floor: string;
  type: 'classroom' | 'lab' | 'office';
  capacity?: number;
  facilities?: string;
  occupant?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    building: { type: String, required: true },
    floor: { type: String, required: true },
    type: { type: String, required: true, enum: ['classroom', 'lab', 'office'] },
    capacity: { type: Number },
    facilities: { type: String },
    occupant: { type: String }
  },
  { timestamps: true }
);

// Clear existing model if it exists
mongoose.models = {};

export const Location = mongoose.model<ILocation>('Location', LocationSchema);