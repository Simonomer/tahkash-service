import { Model } from "mongoose";
import { flatMap as _flatMap } from 'lodash';

import model from '../models/question';
import { IQuestion } from '../models/question';
import { BaseControllerService } from "./base.controller.service";
import {FormControllerService} from "./form.controller.service";

export class QuestionControllerService extends BaseControllerService<IQuestion> {

    model: Model<IQuestion> = model;

    async getQuestionsForBucket(bucketId: string): Promise<IQuestion[]> {
        return this.model.find({
            bucketId: bucketId
        })
    }

    async addQuestionToBucket(text: string, bucketId: string) {
        const currentQuestions = await this.getQuestionsForBucket(bucketId);
        return await this.save({text, bucketId, priority: currentQuestions.length} as IQuestion);
    }

    async deleteQuestion(questionId) {
        const question: IQuestion = await this.model.findByIdAndDelete(questionId);
        if (!question) {
            throw Error(`Not found question with the Id: ${questionId}`)
        }

        const higherPriorityQuestions = await this.model.find({
            priority: { $gt: question.priority }
        });

        higherPriorityQuestions.map(currentQuestion => ({...currentQuestion, priority: currentQuestion.priority - 1}));
        await this.updateMany(higherPriorityQuestions);
    }

    async getQuestionsForForm(formId: string): Promise<IQuestion[]> {
        let questions = [];
        const formService = new FormControllerService();
        const currentForm = await formService.model.findById(formId);

        for (let bucketId of currentForm.bucketIds) {
            const questionsForThisBucket = await this.getQuestionsForBucket(bucketId);
            questions.push(questionsForThisBucket);
        }

        return _flatMap(questions);
    }
}