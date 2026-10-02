import mongoose, { Document, Schema } from "mongoose";

export interface IOption extends Document {
    header: string;
    desc: string;
    img: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDemo?: boolean;
}

const optionsSchema: Schema<IOption> = new Schema(
    {
        header: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        isDemo: { type: Boolean, required: false },
    },
    { timestamps: true }
);

export default mongoose.model<IOption>("options", optionsSchema);
