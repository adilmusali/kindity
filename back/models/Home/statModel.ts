import { Schema, model, Document } from 'mongoose';

interface IStat extends Document {
  header: string;
  desc: string;
  number: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const statSchema: Schema = new Schema<IStat>({
  header: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const StatModel = model<IStat>('statistics', statSchema);