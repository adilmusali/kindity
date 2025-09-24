import { Schema, model, Document } from 'mongoose';

interface ICauses extends Document {
  img: string;
  header: string;
  desc: string;
  raised: number;
  need: number;
  createdAt: Date;
  updatedAt: Date;
}

const causesSchema: Schema = new Schema<ICauses>({
  img: {
    type: String,
    required: true
  },
  header: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  raised: {
    type: Number,
    required: true
  },
  need: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export const CausesModel = model<ICauses>('causes', causesSchema);