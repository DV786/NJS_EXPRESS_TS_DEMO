import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { Document } from "mongoose";
import { UserController } from "../user/user.controller";
import { IPartialTaskWithId, ITask } from "./tasks.interface";
import { TaskService } from "./tasks.service";
import { UpdateTaskProvider } from "./providers/updateTask.provider";
import { matchedData } from "express-validator";

@injectable()
export class TasksController {
  constructor(
    @inject(UserController) private userController: UserController,
    @inject(TaskService) private taskService: TaskService,
    @inject(UpdateTaskProvider) private updateTaskProvider: UpdateTaskProvider
  ) { }

  public async handlePostTask(req: Request<{}, {}, ITask>, res: Response) {
    const task: Document<unknown, any, ITask> = await this.taskService.createTask(req.body);
    await task.save();

    return task;
  };


  public async handleGetTask(req: Request, res: Response) {
    const tasks = await this.taskService.findAll();
    return tasks;
  };

  public async handlePatchTask(
    req: Request<{}, {}, IPartialTaskWithId>,
    res: Response
  ): Promise<Document> {
    const validatedData: IPartialTaskWithId = matchedData(req);
    try {
      return await this.updateTaskProvider.updateTask(validatedData);
    } catch (error: any) {
      throw new Error(error)
    }
  };
}