import {ITag} from "../models/tag";
import {TagControllerService} from "../services/tag.controller.service";

async function hello(req, res) {
  const service = new TagControllerService();
  const serviceRes = await service.save({name: "name"} as ITag)
  res.json(serviceRes);
}

module.exports = {
  hello: hello
};
