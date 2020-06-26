import statusCodes from 'http-status-codes'
import {TagControllerService} from "../services/tag.controller.service";

export async function createTag(req, res) {
    const service = new TagControllerService();
    const tag = req.body;
    const createdTag = await service.save(tag);
    await res.status(statusCodes.CREATED).json(createdTag);
}

export async function modifyTag(req, res) {
    const service = new TagControllerService();
    const tag = req.body;
    const updatedTags = await service.updateMany([tag]); // not willing to write update function now
    await res.status(statusCodes.OK).json(updatedTags)
}

export async function deleteTag(req, res) {
    const service = new TagControllerService();
    const tagId = req.swagger.params.tagId.value;
    const deletedItem = await service.deleteById(tagId);
    await res.status(statusCodes.OK).json(deletedItem);
}

