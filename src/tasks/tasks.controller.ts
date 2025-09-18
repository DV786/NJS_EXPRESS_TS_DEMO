import { inject, injectable } from "inversify";
import { UserController } from "../user/user.controller";

@injectable()
export class TasksController {
  constructor(@inject(UserController) private userController: UserController) { }

  public handlePostTask() {
    return {
      title: 'This is a title',
      description: 'Task description'
    }
  }


  public handleGetTask() {
    return [
      {
        title: 'This is a title',
        description: 'Task description'
      }
    ]
  }

  public handlePatchTask() {
    return {
      title: 'This is a title',
      description: 'Task description'
    }
  };
}