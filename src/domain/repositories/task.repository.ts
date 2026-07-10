import type { Task } from "../entities/task.entity.js";

//Data for creating a task
export interface CreateTaskData {
    title: string;
    description?: string | null;
    userId: string;
}

//Data for updating a task
export interface UpdateTaskData {
    title?: string;
    description?: string | null;
    completed?: boolean;
}

//Contract for the Task Repository
export interface ITaskRepository {
    findAllByUserId(userId: string) : Promise<Task[]>;
    findById(id: string) : Promise<Task | null>;
    create(data: CreateTaskData) : Promise<Task>;
    update(id: string, data: UpdateTaskData) : Promise<Task>;
    delete(id: string) : Promise<void>;
}