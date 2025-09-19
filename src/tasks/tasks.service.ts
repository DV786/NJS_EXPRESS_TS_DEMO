import { injectable } from "inversify";
import { FilterQuery, Model } from "mongoose";
import { Task } from "./tasks.schema";
import { ITask } from "./tasks.interface";
import { IPagination } from "./interface/pagination.interface";

@injectable()
export class TaskService {
  private taskModel: Model<ITask> = Task;

  public async createTask(taskData: ITask) {
    return await new this.taskModel(taskData).save(); ``
  };

  public async findById(_Id: string) {
    return await this.taskModel.findById(_Id);
  };

  public async findActive(pagination: IPagination) {
    return await this.taskModel
      .find({
        status: { $in: ['todo', 'inProgress'] }
      })
      .limit(pagination.limit)
      .skip(pagination.page - 1)
      .sort({
        createdAt: pagination.order
      });
  };

  public async findAll(pagination: IPagination) {
    return await this.taskModel
      .find()
      .limit(pagination.limit)
      .skip(pagination.page - 1)
      .sort({
        createdAt: pagination.order
      });
  };

  public async countDocuments(filter?: FilterQuery<ITask>) {
    return await this.taskModel.countDocuments(filter)
  };
}