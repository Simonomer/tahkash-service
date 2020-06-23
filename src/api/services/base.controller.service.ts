import {Document, Model} from "mongoose";

export abstract class BaseControllerService<TContent extends Document> {

    abstract model: Model<TContent>;

    async save(data: TContent): Promise<TContent> {
        const obj = new this.model(data);
        await obj.save((err) => {
            console.log(err);
        });

        return obj;
    }
}