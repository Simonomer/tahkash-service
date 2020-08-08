import mongoose, { Schema, Document } from 'mongoose';
import {IBucket} from "./bucket";
import {IForm} from "./form";

export interface IQuestion extends Document {
    bucketId: IBucket["_id"],
    formId: IForm["_id"],
    text: string,
    priority: number,
    eventDate: Date
}

const questionSchema: Schema = new Schema({
    bucketId: { type: Schema.Types.ObjectId },
    formId: { type: Schema.Types.ObjectId },
    eventDate: { type: Date },
    text: { type: String, required: true },
    priority: { type: Number, required: true }
});

export default mongoose.model<IQuestion>('Question', questionSchema);