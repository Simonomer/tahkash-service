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

    async saveMany(data: TContent[]): Promise<TContent[]> {
        let res = [];
        data.map(async (curr) => {
            const obj = new this.model(curr);
            await obj.save((err) => {
                console.log(err);
            })

            res.push(obj);
        })

        return res;
    }

    async findAll(): Promise<TContent[]> {
        return this.model.find({});
    }
}