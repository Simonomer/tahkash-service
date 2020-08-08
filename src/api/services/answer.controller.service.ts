import {Model} from "mongoose";

import model from '../models/answer';
import {BaseControllerService} from "./base.controller.service";
import {IAnswer} from "../models/answer";
import {QuestionControllerService} from "./question.controller.service";
import question, {IQuestion} from "../models/question";

export class AnswerControllerService extends BaseControllerService<IAnswer>{

    model: Model<IAnswer> = model;

    async postAnswer(text: string, rating?: number): Promise<IAnswer> {
        return await this.save({text, rating} as IAnswer)
    }

    async postAnswers(answers: IAnswer[]): Promise<IAnswer[]> {
        return this.saveMany(answers);
    }

    async getAnswersForForm(formId: string) {
        const questionsService = new QuestionControllerService();
        const formQuestions = await questionsService.getQuestionsForForm(formId);
        return await this.getAnswers(formQuestions, (question: IQuestion) => ({questionId: question._id, formId: question.formId}));
    }

    async getAnswersForBucket(bucketId: string) {
        const questionsService = new QuestionControllerService();
        const bucketQuestions = await questionsService.getQuestionsForBucket(bucketId);
        return await this.getAnswers(bucketQuestions, (question: IQuestion) => ({questionId: question._id}));
    }

    async getAnswers(questionList: IQuestion[], query: (question: IQuestion) => object) {
        let questionsWithAnswers = [];

        for (const question of questionList) {
            const answersPerThisQuestions = await this.model.find(query)
            questionsWithAnswers.push({...question.toObject(), answers: answersPerThisQuestions});
        }

        return questionsWithAnswers;
    }

}