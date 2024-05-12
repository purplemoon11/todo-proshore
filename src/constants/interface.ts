import { TodoStatus } from "./enums";

export interface TodoRequestBody {
  id: number;
  name: string;
  shortDescription: string;
  dateAndTime: string;
  status: TodoStatus;
}
