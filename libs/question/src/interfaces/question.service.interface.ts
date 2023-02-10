import { Question, BaseQuestion, ServiceInterface } from "@app/types";

interface QuestionsServiceInterface
  extends ServiceInterface<Question, BaseQuestion> {}

export { QuestionsServiceInterface };
