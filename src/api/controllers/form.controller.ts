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
    const modifiedForm = (await service.updateMany([form]))[0].toObject();
    const extendedForm = await service.getFormWithTags(modifiedForm._id.toString());
    await res.status(statusCodes.OK).json(extendedForm);
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

export async function getForm(req, res) {
    const service = new FormControllerService();
    const formId: string = req.swagger.params.formId.value;
    const form = await service.getFormWithTags(formId);
    await res.status(statusCodes.OK).json(form);
}

export async function deleteForm(req, res) {
    const service = new FormControllerService();
    const formId: string = req.swagger.params.formId.value;
    const response = await service.deleteById(formId);
    await res.status(statusCodes.OK).json(response);
}