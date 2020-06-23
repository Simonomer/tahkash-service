import mongoose, { Schema, Document } from 'mongoose';

export interface ITag extends Document {
    name: string
}

const tagSchema: Schema = new Schema({
    name: { type: String, required: true }
});

export default mongoose.model<ITag>('Tag', tagSchema);