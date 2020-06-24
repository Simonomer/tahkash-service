import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
    text: string
}

const questionSchema: Schema = new Schema({
    text: { type: String, required: true }
});

export default mongoose.model<IQuestion>('Question', questionSchema);