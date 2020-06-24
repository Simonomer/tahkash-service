import mongoose, { Schema, Document } from 'mongoose';
import {IQuestion} from "./question";

export interface IAnswer extends Document {
    question: IQuestion["_id"],
    text: string
}

const answerSchema: Schema = new Schema({
    question: { type: Schema.Types.ObjectId, required: true },
    text: { type: String, required: true }
})

export default mongoose.model<IAnswer>('Answer', answerSchema);