import mongoose, { Schema, Document } from 'mongoose';
import {IForm} from "./form";

export interface IQuestion extends Document {
    form: IForm["_id"],
    text: string,
    priority: number
}

const questionSchema: Schema = new Schema({
    form: { type: Schema.Types.ObjectId, required: true },
    text: { type: String, required: true },
    priority: { type: Number, required: true }
});

export default mongoose.model<IQuestion>('Question', questionSchema);