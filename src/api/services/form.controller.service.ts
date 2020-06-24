import {Model} from "mongoose";

import model from '../models/form';
import {IForm} from "../models/form";
import {BaseControllerService} from "./base.controller.service";

export class FormControllerService extends BaseControllerService<IForm> {

    model: Model<IForm> = model;

    async addForm(name: string, link?: string, tags?: string[]): Promise<IForm> {
        return await this.save({ name, link, tags } as IForm)
    }

}