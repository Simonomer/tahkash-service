import statusCodes from 'http-status-codes'
import {AnswerControllerService} from "../services/answer.controller.service";

export async function postAnswers(req,res) {
    const service = new AnswerControllerService();
    const answers = req.body;
    const createdAnswers = await service.postAnswers(answers);
    await res.status(statusCodes.CREATED).json(createdAnswers);
}

export async function getAnswersForForm(req, res) {
    const service = new AnswerControllerService();
    const formId = req.swagger.params.formId.value;
    const questionsWithAnswers = await service.getAnswersForForm(formId);
    await res.status(statusCodes.OK).json(questionsWithAnswers);
}

export async function getAnswersForBucket(req, res) {
    const service = new AnswerControllerService();
    const bucketId = req.swagger.params.bucketId.value;
    const questionsWithAnswers = await service.getAnswersForBucket(bucketId);
    await res.status(statusCodes.OK).json(questionsWithAnswers);
}