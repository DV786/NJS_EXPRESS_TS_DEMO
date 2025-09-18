import { Router, Request, Response } from "express";
import { TasksController } from "./tasks.controller";
import { inject, injectable } from "inversify";
import { ITask } from "./tasks.interface";

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
    this.router.get('/', (req: Request, res: Response) => {
      const newTask = this.tasksController.handleGetTask();
      res.json(newTask);
    });

    this.router.post('/create', async (req: Request<{}, {}, ITask>, res: Response) => {
      const newTask = await this.tasksController.handlePostTask(req, res);
      res.json(newTask);
    });

    this.router.patch('/update', (req: Request, res: Response) => {
      const newTask = this.tasksController.handlePatchTask();
      res.json(newTask);
    });
  }
}