import mongoose, { Schema, Document } from 'mongoose';

export interface IAnswer extends Document {
    text: string
}

const answerSchema: Schema = new Schema({
    text: { type: String, required: true }
})

export default mongoose.model<IAnswer>('Answer', answerSchema);