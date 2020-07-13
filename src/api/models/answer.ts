import mongoose, { Schema, Document } from 'mongoose';
import {IQuestion} from "./question";

export interface IAnswer extends Document {
    questionId: IQuestion["_id"],
    text: string,
    rating: number
}

const answerSchema: Schema = new Schema({
    questionId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    rating: { type: Number }
})

export default mongoose.model<IAnswer>('Answer', answerSchema);