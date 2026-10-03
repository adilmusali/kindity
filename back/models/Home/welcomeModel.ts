import { Schema, model, Document } from "mongoose"

interface IWelcome extends Document {
    header: string;
    desc: string;
    donation: number;
    projects: number;
    volunteers: number;
    img: string;
    createdAt: Date;
    updatedAt: Date;
    isDemo?: boolean;
}

const welcomeSchema: Schema = new Schema <IWelcome>({
    header: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    donation: {
        type: Number,
        required: true
    },
    projects: {
        type: Number,
        required: true
    },
    volunteers: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    isDemo: { type: Boolean, required: false }
}, { timestamps: true });

export const WelcomeModel = model<IWelcome>('welcome', welcomeSchema);

