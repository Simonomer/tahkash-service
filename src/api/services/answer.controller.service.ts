import {Model} from "mongoose";

import model from '../models/answer';
import {BaseControllerService} from "./base.controller.service";
import {IAnswer} from "../models/answer";

export class AnswerControllerService extends BaseControllerService<IAnswer>{

    model: Model<IAnswer> = model;

    async postAnswer(text: string): Promise<IAnswer> {
        return await this.save({text} as IAnswer)
    }

    async postAnswers(answers: IAnswer[]): Promise<IAnswer[]> {
        return this.saveMany(answers);
    }
}