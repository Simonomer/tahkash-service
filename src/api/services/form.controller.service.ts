import {Model} from "mongoose";
import {flatMap as _flatMap, uniq as _uniq, groupBy as _groupBy} from 'lodash';

import model from '../models/form';
import {IForm} from "../models/form";
import {BaseControllerService} from "./base.controller.service";
import {TagControllerService} from "./tag.controller.service";

export class FormControllerService extends BaseControllerService<IForm> {

    model: Model<IForm> = model;

    async addForm(name: string, link?: string, tags?: string[]): Promise<IForm> {
        return await this.save({ name, link, tags } as IForm)
    }

    async getFormsWithTheirTags() {
        const tagService = new TagControllerService();
        const forms: IForm[] = await this.findAll();
        const uniqTagIds = _uniq(_flatMap(forms, form => form.tags));
        const foundTags = _groupBy(await tagService.model.find({ _id: { $in: uniqTagIds } }), '_id');
        return forms.map(form => ({...form.toObject(), tags: _flatMap(form.tags, tagId => foundTags[tagId])}))
    }

}