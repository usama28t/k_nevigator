import mongoose, { Schema, Document } from 'mongoose';

export interface IDegree extends Document {
  code: string;
  name: string;
  shortName: string;
  totalSemesters: number;
  createdAt: Date;
  updatedAt: Date;
}

const DegreeSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    totalSemesters: { type: Number, required: true, default: 8 }
  },
  { timestamps: true }
);

export const Degree = mongoose.models.Degree || mongoose.model<IDegree>('Degree', DegreeSchema);