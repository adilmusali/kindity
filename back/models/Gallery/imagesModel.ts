import { Schema, model, Document } from "mongoose";

export interface IImage extends Document {
    img: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const imagesSchema = new Schema<IImage>(
    {
        img: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<IImage>("gallery", imagesSchema);