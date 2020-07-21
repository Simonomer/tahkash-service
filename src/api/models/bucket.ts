import mongoose, { Schema, Document } from 'mongoose';

export interface IBucket extends Document {
    name: string
    course: string,
    week: string,
}

const bucketSchema: Schema = new Schema({
    name: { type: String, required: true },
    course: { type: String, required: true },
    week: { type: String, required: true }
})

export default mongoose.model<IBucket>('Bucket', bucketSchema);
