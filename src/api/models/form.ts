import mongoose, { Schema, Document } from 'mongoose';

export interface IForm extends Document {
    name: string,
    link: string,
    tags: string[]
}

const formSchema: Schema = new Schema({
    name: { type: String, required: true },
    link: { type: String },
    tags: { type: [String], default: [] }
})

export default mongoose.model<IForm>('Form', formSchema);