import mongoose, { Schema, Document } from 'mongoose';
import {IBucket} from "./bucket";

export interface IQuestion extends Document {
    bucketId: IBucket["_id"],
    text: string,
    priority: number
}

const questionSchema: Schema = new Schema({
    bucketId: { type: Schema.Types.ObjectId, required: true },
    text: { type: String, required: true },
    priority: { type: Number, required: true }
});

export default mongoose.model<IQuestion>('Question', questionSchema);