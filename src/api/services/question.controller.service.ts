import { Model } from "mongoose";

import model from '../models/question';
import { IQuestion } from '../models/question';
import { BaseControllerService } from "./base.controller.service";

export class QuestionControllerService extends BaseControllerService<IQuestion> {

    model: Model<IQuestion> = model;

    async getQuestionsForForm(formId: string): Promise<IQuestion[]> {
        return this.model.find({
            form: formId
        })
    }

    async addQuestionToForm(text, formId) {
        const currentQuestions = await this.getQuestionsForForm(formId);
        return await this.save({text, form: formId, priority: currentQuestions.length} as IQuestion);
    }

    async deleteQuestion(questionId) {
        const question: IQuestion = await this.model.findByIdAndDelete(questionId);
        const higherPriorityQuestions = await this.model.find({
            priority: { $gt: question.priority }
        });

        higherPriorityQuestions.map(currentQuestion => ({...currentQuestion, priority: currentQuestion.priority - 1}));
        await this.saveMany(higherPriorityQuestions);
        return this.findAll();
    }
}