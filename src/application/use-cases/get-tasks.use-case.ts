import type { Task } from "../../domain/entities/task.entity.js";
import type { ITaskRepository } from "../../domain/repositories/task.repository.js";

export class GetTasksUseCase {

    private readonly taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }

    async execute(userId: string): Promise<Task[]> {
        return this.taskRepository.findAllByUserId(userId);
    }

}