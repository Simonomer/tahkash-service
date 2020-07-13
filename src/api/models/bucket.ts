import mongoose, { Schema, Document } from 'mongoose';

export interface IBucket extends Document {
    name: string
}

const bucketSchema: Schema = new Schema({
    name: { type: String, required: true }
})

export default mongoose.model<IBucket>('Bucket', bucketSchema);
