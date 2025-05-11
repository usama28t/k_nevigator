import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Document {
  name: string;
  photo?: string;
  designation: string;
  department: string;
  subjects: string[];
  email: string;
  phone?: string;
  office: string;
  officeHours: string;
  education?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TeacherSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    photo: { type: String },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    subjects: { type: [String], required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    office: { type: String, required: true },
    officeHours: { type: String, required: true },
    education: { type: String }
  },
  { timestamps: true }
);

// Clear existing model if it exists
mongoose.models = {};

export const Teacher = mongoose.model<ITeacher>('Teacher', TeacherSchema);