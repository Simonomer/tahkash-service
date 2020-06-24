import {ITag} from "../models/tag";
import {QuestionControllerService} from "../services/question.controller.service";

async function hello(req, res) {
  const service = new QuestionControllerService();
  const question = await service.addQuestionToForm("question1", "5ef25be6480e6d45584bd5f4")
  const question2 = await service.addQuestionToForm("question2", "5ef25be6480e6d45584bd5f4")
  const question3 = await service.addQuestionToForm("question3", "5ef25be6480e6d45584bd5f4")
  const newList = await service.deleteQuestion(question2._id);
  res.json(newList);
}

module.exports = {
  hello: hello
};
