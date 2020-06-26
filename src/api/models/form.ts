import mongoose, { Schema, Document } from 'mongoose';
import {ITag} from "./tag";

export interface IForm extends Document {
    name: string,
    link: string,
    tags: ITag["_id"][]
}

const formSchema: Schema = new Schema({
    name: { type: String, required: true },
    link: { type: String },
    tags: { type: [String], default: [] }
})

export default mongoose.model<IForm>('Form', formSchema);