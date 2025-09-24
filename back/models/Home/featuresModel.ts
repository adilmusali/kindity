import { Schema, model, Document } from 'mongoose';

interface IFeature extends Document {
  logo: string;
  header: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}

const featuresSchema: Schema = new Schema<IFeature>({
  logo: {
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
  }
}, { timestamps: true });

export const FeaturesModel = model<IFeature>('features', featuresSchema);