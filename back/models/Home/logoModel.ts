import { Schema, model, Document } from "mongoose";

export interface ILogo extends Document {
    img: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const logoSchema = new Schema<ILogo>(
    {
        img: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<ILogo>("logo", logoSchema);