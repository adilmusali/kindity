import mongoose, { Document, Schema } from "mongoose";

export interface INews extends Document {
    header: string;
    desc: string;
    img: string;
    category1: string;
    category2: string;
    category3: string;
    category4: string;
    user: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const newsSchema: Schema = new Schema(
    {
        header: { type: String, required: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        category1: { type: String, required: true },
        category2: { type: String, required: true },
        category3: { type: String, required: true },
        category4: { type: String, required: true },
        user: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<INews>("news", newsSchema);
