import mongoose, { Schema, Document } from 'mongoose';
import { IFarm } from '@/models/farm.model';
import { IReminder } from '@/models/reminder.model';

export interface IFarmer extends Document {
  name: string;
  phoneNumber: string;
  location: string;
  firebaseUid: string;
  createdAt: Date;
  farms: IFarm['_id'][];
  reminders: IReminder['_id'][];
}

const FarmerSchema: Schema = new Schema<IFarmer>(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    firebaseUid: { type: String, required: true, unique: true },
    farms: [{ type: Schema.Types.ObjectId, ref: 'Farm' }],
    reminders: [{ type: Schema.Types.ObjectId, ref: 'Reminder' }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IFarmer>('Farmer', FarmerSchema);