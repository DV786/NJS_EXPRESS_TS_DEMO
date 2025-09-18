import { Router, Request, Response } from "express";
import { TasksController } from "./tasks.controller";
import { inject, injectable } from "inversify";
import { IPartialTaskWithId, ITask } from "./tasks.interface";

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
    this.router.get('/', async (req: Request, res: Response) => {
      const allTasks = await this.tasksController.handleGetTask(req, res);
      res.json(allTasks);
    });

    this.router.post('/create', async (req: Request<{}, {}, ITask>, res: Response) => {
      const newTask = await this.tasksController.handlePostTask(req, res);
      res.json(newTask);
    });

    this.router.patch('/update', async (req: Request<{}, {}, IPartialTaskWithId>, res: Response) => {
      const updatedTask = await this.tasksController.handlePatchTask(req, res);
      res.json(updatedTask);
    });
  }
}