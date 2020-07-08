import {Model} from "mongoose";

import model from '../models/answer';
import {BaseControllerService} from "./base.controller.service";
import {IAnswer} from "../models/answer";
import {QuestionControllerService} from "./question.controller.service";

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
        let questionsWithAnswers = [];

        for (const question of formQuestions) {
            const answersPerThisQuestions = await this.model.find({question: question._id})
            questionsWithAnswers.push({...question.toObject(), answers: answersPerThisQuestions});
        }

        return questionsWithAnswers;
    }
}