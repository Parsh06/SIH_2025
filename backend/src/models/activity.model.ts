import mongoose, { Schema, Document } from 'mongoose';
import { IFarm } from '@/models/farm.model';

export interface IActivity extends Document {
  farm: IFarm['_id'];
  type: string;
  description: string;
  timestamp: Date;
}

const ActivitySchema: Schema = new Schema<IActivity>(
  {
    farm: { type: Schema.Types.ObjectId, ref: 'Farm', required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }
);

export default mongoose.model<IActivity>('Activity', ActivitySchema);