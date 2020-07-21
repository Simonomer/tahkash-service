import statusCodes from 'http-status-codes'
import {QuestionControllerService} from "../services/question.controller.service";

export async function createQuestionForBucket(req, res) {
    const service = new QuestionControllerService();
    const bucketId = req.swagger.params.bucketId.value;
    const question = req.body;
    const createdQuestion = await service.addQuestionToBucket(question.text, bucketId);
    await res.status(statusCodes.CREATED).json(createdQuestion)
}

export async function createQuestionForForm(req, res) {
    const service = new QuestionControllerService();
    const formId = req.swagger.params.formId.value;
    const question = req.body;
    const createdQuestion = await service.addQuestionToForm(question.text, formId);
    await res.status(statusCodes.CREATED).json(createdQuestion)
}

export async function modifyQuestions(req, res) {
    const service = new QuestionControllerService();
    const questions = req.body;
    const updatedQuestions = await service.updateMany(questions);
    await res.status(statusCodes.OK).json(updatedQuestions)
}

export async function deleteQuestion(req, res) {
    const service = new QuestionControllerService();
    const questionId = req.swagger.params.questionId.value;
    await service.deleteQuestion(questionId);
    await res.status(statusCodes.OK).json({_id: questionId})
}

export async function getQuestionsForForm(req, res) {
    const service = new QuestionControllerService();
    const formId = req.swagger.params.formId.value;
    const questions = await service.getQuestionsForForm(formId);
    await res.status(statusCodes.OK).json(questions);
}

export async function getQuestionsForBucket(req, res) {
    const service = new QuestionControllerService();
    const bucketId = req.swagger.params.bucketId.value;
    const questions = await service.getQuestionsForBucket(bucketId);
    await res.status(statusCodes.OK).json(questions);
}
