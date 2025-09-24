import mongoose, { Schema, Document, Model } from 'mongoose';

interface ITestimonial extends Document {
    img: string;
    desc: string;
    name: string;
    job: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const testSchema: Schema = new Schema<ITestimonial>(
    {
        img: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        job: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Testimonial: Model<ITestimonial> = mongoose.model<ITestimonial>('testimonial', testSchema);