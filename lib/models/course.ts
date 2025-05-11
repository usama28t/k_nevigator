import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  code: string;
  title: string;
  creditHours: number;
  prerequisites: string[];
  degreeCode: string;
  semester: number;
  type: 'Core' | 'Elective';
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    creditHours: { type: Number, required: true },
    prerequisites: { type: [String], default: [] },
    degreeCode: { type: String, required: true },
    semester: { type: Number, required: true },
    type: { type: String, required: true, enum: ['Core', 'Elective'] },
    description: { type: String }
  },
  { timestamps: true }
);

// Clear existing model if it exists
mongoose.models = {};

export const Course = mongoose.model<ICourse>('Course', CourseSchema);