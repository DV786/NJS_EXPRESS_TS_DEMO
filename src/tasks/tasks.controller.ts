import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { Document } from "mongoose";
import { UserController } from "../user/user.controller";
import { IPartialTaskWithId, ITask } from "./tasks.interface";
import { TaskService } from "./tasks.service";
import { UpdateTaskProvider } from "./providers/updateTask.provider";
import { matchedData } from "express-validator";
import { IPagination } from "./interface/pagination.interface";
import { GetTaskProvider } from "./providers/getTask.provider";

@injectable()
export class TasksController {
  constructor(
    @inject(UserController) private userController: UserController,
    @inject(TaskService) private taskService: TaskService,
    @inject(GetTaskProvider) private getTaskProvider: GetTaskProvider,
    @inject(UpdateTaskProvider) private updateTaskProvider: UpdateTaskProvider
  ) { }

  public async handlePostTask(req: Request<{}, {}, ITask>, res: Response) {
    const task: Document<unknown, any, ITask> = await this.taskService.createTask(req.body);
    await task.save();

    return task;
  };


  public async handleGetTask(req: Request, res: Response) {
    const validatedData: Partial<IPagination> = matchedData(req);
    try {
      const tasks: { data: ITask[], meta: {} } = await this.getTaskProvider.findAllTasks(validatedData);
      return tasks;
    } catch (error: any) {
      throw new Error(error)
    }
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