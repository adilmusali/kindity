import { Schema, model, Document } from 'mongoose';

interface IStat extends Document {
  header: string;
  desc: string;
  number: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  isDemo?: boolean;
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
  },
  isDemo: { type: Boolean, required: false }
}, { timestamps: true });

export const StatModel = model<IStat>('statistics', statSchema);
