import mongoose, { Schema, Document } from 'mongoose';
import {IQuestionToForm} from "./question-to-form";
import {IAnswer} from "./answer";

export interface IAnswerQuestionForm extends IQuestionToForm {
    answer: IAnswer["_id"]
}

const answerQuestionFormSchema: Schema = new Schema({
    question: { type: Schema.Types.ObjectId, required: true },
    form: { type: Schema.Types.ObjectId, required: true },
    answer: { type: Schema.Types.ObjectId, required: true },
    priority: { type: Number, required: true }
})

export default mongoose.model<IAnswerQuestionForm>('AnswerQuestionForm', answerQuestionFormSchema);