import { inject, injectable } from "inversify";
import { UserController } from "../user/user.controller";

@injectable()
export class TasksController {
  constructor(@inject(UserController) private userController: UserController) { }

  public createTask() {
    console.log(this.userController.getUser());
    return {
      title: 'This is a title',
      description: 'Task description'
    }
  }
}