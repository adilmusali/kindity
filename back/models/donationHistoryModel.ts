import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./userModel";

export interface IDonation extends Document {
    user: IUser['_id'];
    amount: number;
    currency: string;
    stripePaymentId: string;
    status: string;
}

const donationHistorySchema = new Schema<IDonation>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
    },
    stripePaymentId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        default: 'succeeded',
    }
}, { timestamps: true });

const DonationHistoryModel: Model<IDonation> = mongoose.model<IDonation>('DonationHistory', donationHistorySchema);

export default DonationHistoryModel;