import mongoose, { Schema, Document } from 'mongoose';
import {IForm} from "./form";
import {ITag} from "./tag";

export interface ITagToForm extends Document {
    form: IForm["_id"],
    tag: ITag["_id"]
}

const tagToFormSchema: Schema = new Schema({
    form: { type: Schema.Types.ObjectId, required: true },
    tag: { type: Schema.Types.ObjectId, required: true }
})

export default mongoose.model<ITagToForm>('TagToForm', tagToFormSchema);