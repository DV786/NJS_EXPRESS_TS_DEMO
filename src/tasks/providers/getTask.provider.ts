import { inject, injectable } from "inversify";
import { TaskService } from "../tasks.service";
import { IPagination } from "../interface/pagination.interface";
import { ITask } from "../tasks.interface";

@injectable()
export class GetTaskProvider {
  constructor(
    @inject(TaskService) private taskService: TaskService,
  ) { }

  public async findAllTasks(
    pagination: Partial<IPagination>
  ): Promise<{
    data: ITask[],
    meta: {}
  }> {
    const tasks: ITask[] = await this.taskService.findActive({
      limit: pagination.limit ?? 10,
      page: pagination.page ?? 1,
      order: pagination.order ?? 'asc',
    });

    const totalTasks = await this.taskService.countDocuments();
    const completedTasks = await this.taskService.countDocuments({
      status: 'completed'
    });
    const todoTasks = await this.taskService.countDocuments({
      status: 'todo'
    });
    const inProgressTasks = await this.taskService.countDocuments({
      status: 'inProgress'
    });

    return {
      data: tasks,
      meta: {
        totalTasks,
        completedTasks,
        todoTasks,
        inProgressTasks
      }
    }
  }
}