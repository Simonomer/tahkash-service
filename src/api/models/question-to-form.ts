import mongoose, { Schema, Document } from 'mongoose';
import {IQuestion} from "./question";
import {IForm} from "./form";

export interface IQuestionToForm extends Document {
    question: IQuestion["_id"],
    form: IForm["_id"],
    priority: number
}

const questionToFormSchema: Schema = new Schema({
    question: { type: Schema.Types.ObjectId, required: true },
    form: { type: Schema.Types.ObjectId, required: true },
    priority: { type: Number, required: true }
})

export default mongoose.model<IQuestionToForm>('QuestionToForm', questionToFormSchema)