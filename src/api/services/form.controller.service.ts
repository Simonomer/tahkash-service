import {Model} from "mongoose";
import {flatMap as _flatMap, uniq as _uniq, groupBy as _groupBy, filter as _filter, omit as _omit} from 'lodash';

import model from '../models/form';
import {IForm} from "../models/form";
import {BaseControllerService} from "./base.controller.service";
import {BucketControllerService} from "./bucket.controller.service";
import {QuestionControllerService} from "./question.controller.service";
import {IQuestion} from "../models/question";

export class FormControllerService extends BaseControllerService<IForm> {

    model: Model<IForm> = model;

    async addForm(name: string, link?: string, bucketIds?: string[]): Promise<IForm> {
        const nameAfterDuplicateCheck = await this.generateDuplicateFormName(name);
        return await this.save({ name: nameAfterDuplicateCheck, link, bucketIds, creationTime: Date.now() } as IForm)
    }

    async getFormWithBuckets(formId: string) {
        const allForms = await this.getFormsWithTheirBuckets();
        return allForms.find(form => form._id.toString() === formId);
    }

    async getFormsWithTheirBuckets() {
        const bucketService = new BucketControllerService();
        const forms: IForm[] = await this.findAll();
        const uniqBucketIds = _uniq(_flatMap(forms, form => form.bucketIds));
        const foundBuckets = _groupBy(await bucketService.model.find({ _id: { $in: uniqBucketIds } }), '_id');
        return forms.map(form => ({...form.toObject(), bucketIds: _flatMap(form.bucketIds, bucketId => foundBuckets[bucketId])} as IForm))
    }

    async deleteBucketIdFromForms(bucketId: string) {
        const formsContainingBucketId: IForm[] = await this.model.find({bucketIds: bucketId});
        const formsWithoutBucketId = formsContainingBucketId.map(form => ({...form.toObject(), bucketIds: _filter(form.bucketIds, bucket => bucket !== bucketId)} as IForm));
        await this.updateMany(formsWithoutBucketId);
    }

    async duplicateForm(formId: string): Promise<IForm> {
        const currentForm = await this.model.findById(formId);
        const newFormName = await this.generateDuplicateFormName(currentForm.name);
        return await this.save({..._omit(currentForm.toObject(), ['_id', 'link']), name: newFormName, creationTime: Date.now()} as IForm);
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