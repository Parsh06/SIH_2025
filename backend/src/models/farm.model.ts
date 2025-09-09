import mongoose, { Schema, Document } from 'mongoose';
import { IFarmer } from '@/models/farmer.model';
import { IActivity } from '@/models/activity.model';

export interface IFarm extends Document {
  farmer: IFarmer['_id'];
  sizeInAcres: number;
  soilType: string;
  irrigation: string;
  location: string;
  crops: string[];
  createdAt: Date;
  activities: IActivity['_id'][];
}

const FarmSchema: Schema = new Schema<IFarm>(
  {
    farmer: { type: Schema.Types.ObjectId, ref: 'Farmer', required: true },
    sizeInAcres: { type: Number, required: true },
    soilType: { type: String, required: true },
    irrigation: { type: String, required: true },
    location: { type: String, required: true },
    crops: { type: [String], required: true },
    activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IFarm>('Farm', FarmSchema);
