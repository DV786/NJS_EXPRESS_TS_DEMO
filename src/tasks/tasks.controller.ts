import { injectable } from "inversify";

@injectable()
export class TasksController {
  constructor() { }

  public createTask() {
    return {
      title: 'This is a title',
      description: 'Task description'
    }
  }
}