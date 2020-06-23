import {Model} from "mongoose";

import model from '../models/tag';
import {ITag} from '../models/tag';
import { BaseControllerService } from "./base.controller.service";

export class TagControllerService extends BaseControllerService<ITag> {

    model: Model<ITag> = model;
}