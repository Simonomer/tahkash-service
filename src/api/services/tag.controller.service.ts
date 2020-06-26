import {Model} from "mongoose";

import model from '../models/tag';
import {ITag} from "../models/tag";
import {BaseControllerService} from "./base.controller.service";
import {FormControllerService} from "./form.controller.service";
import {IForm} from "../models/form";

export class TagControllerService extends BaseControllerService<ITag> {
    model: Model<ITag> = model;

}