import mongoose, { Schema, Document } from 'mongoose';
import { IFarmer } from '@/models/farmer.model';

export interface IReminder extends Document {
  farmer: IFarmer['_id'];
  message: string;
  dueDate: Date;
  createdAt: Date;
}

const ReminderSchema: Schema = new Schema<IReminder>(
  {
    farmer: { type: Schema.Types.ObjectId, ref: 'Farmer', required: true },
    message: { type: String, required: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IReminder>('Reminder', ReminderSchema);