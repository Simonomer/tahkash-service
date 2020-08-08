import { Model } from "mongoose";
import { flatMap as _flatMap } from 'lodash';

import model from '../models/question';
import { IQuestion } from '../models/question';
import { BaseControllerService } from "./base.controller.service";
import {FormControllerService} from "./form.controller.service";

export class QuestionControllerService extends BaseControllerService<IQuestion> {

    model: Model<IQuestion> = model;

    async addQuestionToBucket(text: string, bucketId: string, eventDate: Date) {
        const currentQuestions = await this.getQuestionsForBucket(bucketId);
        return await this.save({text, bucketId, priority: currentQuestions.length, eventDate: eventDate} as IQuestion);
    }

    async addQuestionToForm(text: string, formId: string, eventDate: Date) {
        const currentQuestions = await this.getQuestionsForForm(formId);
        return await this.save({text, formId, priority: 1000 + currentQuestions.length, eventDate: eventDate} as IQuestion);
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

    async getQuestionsForBucket(bucketId: string): Promise<IQuestion[]> {
        return this.model.find({
            bucketId: bucketId
        })
    }

    async getQuestionsForForm(formId: string): Promise<IQuestion[]> {
        let questions = [await this.model.find({formId: formId})];
        const formService = new FormControllerService();
        const currentForm = await formService.model.findById(formId);

        for (let bucketId of currentForm.bucketIds) {
            const questionsForThisBucket = await this.getQuestionsForBucket(bucketId);
            questions.push(questionsForThisBucket);
        }

        return _flatMap(questions);
    }
}