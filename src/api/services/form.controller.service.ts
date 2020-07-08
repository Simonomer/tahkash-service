import {Model} from "mongoose";
import {flatMap as _flatMap, uniq as _uniq, groupBy as _groupBy, filter as _filter, omit as _omit} from 'lodash';

import model from '../models/form';
import {IForm} from "../models/form";
import {BaseControllerService} from "./base.controller.service";
import {TagControllerService} from "./tag.controller.service";
import {QuestionControllerService} from "./question.controller.service";
import {IQuestion} from "../models/question";

export class FormControllerService extends BaseControllerService<IForm> {

    model: Model<IForm> = model;

    async addForm(name: string, link?: string, tags?: string[]): Promise<IForm> {
        const nameAfterDuplicateCheck = await this.generateDuplicateFormName(name);
        return await this.save({ name: nameAfterDuplicateCheck, link, tags, creationTime: Date.now() } as IForm)
    }

    async getFormWithTags(formId: string) {
        const allForms = await this.getFormsWithTheirTags();
        return allForms.find(form => form._id.toString() === formId);
    }

    async getFormsWithTheirTags() {
        const tagService = new TagControllerService();
        const forms: IForm[] = await this.findAll();
        const uniqTagIds = _uniq(_flatMap(forms, form => form.tags));
        const foundTags = _groupBy(await tagService.model.find({ _id: { $in: uniqTagIds } }), '_id');
        return forms.map(form => ({...form.toObject(), tags: _flatMap(form.tags, tagId => foundTags[tagId])}))
    }

    async deleteTagFromForms(tagId: string) {
        const formsContainingTagId: IForm[] = await this.model.find({tags: tagId});
        const formsWithoutTagId = formsContainingTagId.map(form => ({...form.toObject(), tags: _filter(form.tags, tag => tag !== tagId)} as IForm));
        await this.updateMany(formsWithoutTagId);
    }

    async duplicateForm(formId: string): Promise<IForm> {
        const questionService = new QuestionControllerService();
        const questions: IQuestion[] = await questionService.getQuestionsForForm(formId);

        const currentForm = await this.model.findById(formId);
        const newFormName = await this.generateDuplicateFormName(currentForm.name);
        const newForm: IForm = await this.save({..._omit(currentForm.toObject(), ['_id', 'link']), name: newFormName, creationTime: Date.now()} as IForm);

        questions.map(async (question) => {
            const newQuestion = {..._omit(question.toObject(), '_id'), form: newForm._id};
            await questionService.save(newQuestion)
        })

        return newForm;
    }

    async generateDuplicateFormName(designatedName: string) {
        const formNames = (await this.findAll()).map((form: IForm) => form.name);
        for (let i = 0; i < formNames.length; i++) {
            if (formNames.includes(designatedName)) {
                const currentIndex = designatedName.search("\\((\\d)\\)") + 1;
                if (currentIndex !== 0) {
                    designatedName = designatedName.replace(`(${designatedName[currentIndex]})`, `(${1 + + designatedName[currentIndex]})`)
                } else {
                    designatedName = `${designatedName} (1)`
                }
            }
            else {
                return designatedName;
            }
        }

        return designatedName;
    }
}