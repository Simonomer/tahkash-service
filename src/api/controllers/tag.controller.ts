import statusCodes from 'http-status-codes'
import {TagControllerService} from "../services/tag.controller.service";
import {FormControllerService} from "../services/form.controller.service";

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
    const formsService = new FormControllerService();
    const tagId = req.swagger.params.tagId.value;
    const deletedItem = await service.deleteById(tagId);
    await formsService.deleteTagFromForms(tagId);
    await res.status(statusCodes.OK).json(deletedItem);
}