import type { ITaskRepository, UpdateTaskData } from "@/domain/repositories/task.repository.js";

interface UpdateTaskInput extends UpdateTaskData {
    taskId: string;
    userId: string;
}

export class UpdateTaskUseCase {
    
    private readonly taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;

    }

    async execute(input: UpdateTaskInput) {
        const task = await this.taskRepository.finfById(input.taskId);

        if(!task) throw new Error("Task not found");

        if(task.userId !== input.userId) throw new Error('Forbidden: this task does not belong to you');

        return this.taskRepository.update(input.taskId, {
            title: input.title ?? task.title,
            description: input.description ?? task.description,
            completed: input.completed ?? task.completed,
        });
    }
}