import mongoose, { Schema, Document } from 'mongoose';
import {IBucket} from "./bucket";

export interface IForm extends Document {
    name: string,
    link: string,
    creationTime: number,
    bucketIds: IBucket["_id"][]
}

const formSchema: Schema = new Schema({
    name: { type: String, required: true },
    link: { type: String },
    creationTime: { type: Date },
    bucketIds: { type: [String], default: [] }
})

export default mongoose.model<IForm>('Form', formSchema);