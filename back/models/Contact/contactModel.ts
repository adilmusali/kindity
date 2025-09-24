import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
    header: string;
    desc: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const contactSchema: Schema<IContact> = new Schema(
    {
        header: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IContact>("contact", contactSchema);