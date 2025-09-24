import mongoose, { Document, Schema } from "mongoose";

export interface IDonation extends Document {
    header: string;
    desc: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const donationSchema = new Schema<IDonation>(
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

export default mongoose.model<IDonation>("donation", donationSchema);