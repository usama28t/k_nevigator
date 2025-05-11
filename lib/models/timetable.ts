import mongoose, { Schema, Document } from 'mongoose';

export interface ITimetable extends Document {
  course: string;
  title: string;
  day: string;
  time: string;
  room: string;
  teacher: string;
  semester: number;
  createdAt: Date;
  updatedAt: Date;
}

const TimetableSchema: Schema = new Schema(
  {
    course: { type: String, required: true },
    title: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    room: { type: String, required: true },
    teacher: { type: String, required: true },
    semester: { type: Number, required: true }
  },
  { timestamps: true }
);

// Clear existing model if it exists
mongoose.models = {};

export const Timetable = mongoose.model<ITimetable>('Timetable', TimetableSchema);