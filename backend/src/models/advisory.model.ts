import mongoose, { Schema, Document } from 'mongoose';

export interface IAdvisory extends Document {
  title: string;
  description: string;
  createdAt: Date;
}

const AdvisorySchema: Schema = new Schema<IAdvisory>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IAdvisory>('Advisory', AdvisorySchema);