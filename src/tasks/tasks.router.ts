import { Router, Request, Response } from "express";
import { TasksController } from "./tasks.controller";
import { inject, injectable } from "inversify";

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
    this.router.post('/create', (req: Request, res: Response) => {
      const newTask = this.tasksController.createTask();
      res.json(newTask);
    });
  }
}