import type { Task } from "@/domain/entities/task.entity.js";
import type { CreateTaskData, ITaskRepository } from "@/domain/repositories/task.repository.js";

export class CreateTaskUseCase {
    
    private readonly taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }

    async execute(input: CreateTaskData): Promise<Task> {
        if (!input.title.trim()) {
          throw new Error('Title is required');
        }
    
        return this.taskRepository.create(input);
      }
}