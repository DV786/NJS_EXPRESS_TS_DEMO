import { injectable } from "inversify";
import { Model } from "mongoose";
import { Task } from "./tasks.schema";
import { ITask } from "./tasks.interface";

@injectable()
export class TaskService {
  private taskModel: Model<ITask> = Task;

  public async createTask(taskData: ITask) {
    return await new this.taskModel(taskData).save(); ``
  };

  public async findById(_Id: string) {
    return await this.taskModel.findById(_Id);
  };

  public async findAll() {
    return await this.taskModel.find();
  };
}