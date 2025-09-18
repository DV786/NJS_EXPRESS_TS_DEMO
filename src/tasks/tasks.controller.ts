import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { UserController } from "../user/user.controller";
import { Task } from "./tasks.schema";
import { ITask } from "./tasks.interface";
import { Document } from "mongoose";

@injectable()
export class TasksController {
  constructor(@inject(UserController) private userController: UserController) { }

  public async handlePostTask(req: Request<{}, {}, ITask>, res: Response) {
    const task: Document<unknown, any, ITask> = new Task(req.body);
    await task.save();

    return task;
  };


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