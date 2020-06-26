import mongoose, { Schema, Document } from 'mongoose';

export interface ITag extends Document {
    text: string,
    group: string
}

const tagSchema: Schema = new Schema({
    text: { type: String, required: true },
    group: { type: String, required: true }
})

export default mongoose.model<ITag>('Tag', tagSchema);
