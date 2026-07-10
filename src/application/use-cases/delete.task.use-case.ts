import type { ITaskRepository } from "@/domain/repositories/task.repository.js";
import { NotFoundError, ForbiddenError } from "@/domain/errors/app-error.js";

interface DeleteTaskInput {
    taskId: string;
    userId: string;
}

export class DeleteTaskUseCase {
    
    private readonly taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }

    async execute(input: DeleteTaskInput){
        const task = await this.taskRepository.findById(input.taskId);

        if(!task) throw new NotFoundError("Task not found");

        if(task.userId !== input.userId) throw new ForbiddenError('Forbidden: this task does not belong to you');

        await this.taskRepository.delete(input.taskId);
    }
}