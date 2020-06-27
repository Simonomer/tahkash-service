import statusCodes from 'http-status-codes'
import {FormControllerService} from "../services/form.controller.service";

export async function createForm(req, res) {
    const service = new FormControllerService();
    const form = req.body;
    const addedForm = await service.addForm(form.name, form.link, form.tags);
    await res.status(statusCodes.CREATED).json(addedForm);
}

export async function modifyForm(req, res) {
    const service = new FormControllerService();
    const form = req.body;
    const modifiedForm = await service.updateMany([form]);
    await res.status(statusCodes.OK).json(modifiedForm);
}

export async function getAllForms(req, res) {
    const service = new FormControllerService();
    const expand: boolean = req.swagger.params.expand.value;
    if (expand) {
        const forms = await service.getFormsWithTheirTags();
        await res.status(statusCodes.OK).json(forms);
    } else {
        const forms = await service.findAll();
        await res.status(statusCodes.OK).json(forms);
    }
}

export async function duplicateForm(req, res) {
    const service = new FormControllerService();
    const formId = req.body._id;
    const createdFormId = await service.duplicateForm(formId)
    await res.status(statusCodes.CREATED).json(createdFormId);
}