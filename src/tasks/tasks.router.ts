import { Router, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { TasksController } from "./tasks.controller";
import { IPartialTaskWithId, ITask } from "./tasks.interface";
import { createTaskValidator } from "./validators/createTask.validator";
import { getTaskValidator } from "./validators/getTask.validator";
import { updateTaskValidator } from "./validators/updateTask.validator";

@injectable()
export class TasksRouter {
  public router: Router;

  constructor(
    @inject(TasksController) private tasksController: TasksController
  ) {
    this.router = Router();
    this.initializeRoutes();
  };

  private initializeRoutes() {
    this.router.get(
      '/',
      getTaskValidator,
      async (req: Request, res: Response) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
          const allTasks = await this.tasksController.handleGetTask(req, res);
          res.status(StatusCodes.OK).json(allTasks);
        } else {
          res.status(StatusCodes.BAD_GATEWAY).json(result.array());
        }
      }
    );

    this.router.post(
      '/create',
      createTaskValidator,
      async (req: Request<{}, {}, ITask>, res: Response) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
          const newTask = await this.tasksController.handlePostTask(req, res);
          res.status(StatusCodes.CREATED).json(newTask);
        } else {
          res.status(StatusCodes.BAD_REQUEST).json(result.array());
        }
      }
    );

    this.router.patch(
      '/update',
      updateTaskValidator,
      async (req: Request<{}, {}, IPartialTaskWithId>, res: Response) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
          const updatedTask = await this.tasksController.handlePatchTask(req, res);
          res.status(StatusCodes.OK).json(updatedTask);
        } else {
          res.status(StatusCodes.BAD_REQUEST).json(result.array())
        };
      });
  }
}