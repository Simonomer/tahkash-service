import {Model} from "mongoose";

import model from '../models/bucket';
import {IBucket} from "../models/bucket";
import {BaseControllerService} from "./base.controller.service";

export class BucketControllerService extends BaseControllerService<IBucket> {
    model: Model<IBucket> = model;

}