import type { Task } from "../entities/task.entity.js";

export interface CreateTaskData {
    title: string;
    description?: string | null;
    userId: string;
}

export interface UpdateTaskData {
    title?: string;
    description?: string | null;
    completed?: boolean;
}

export interface ITaskRepository {
    findAllByUserId(userId: string) : Promise<Task[]>;
    finfById(id: string) : Promise<Task | null>;
    create(data: CreateTaskData) : Promise<Task>;
    update(id: string, data: UpdateTaskData) : Promise<Task>;
    delete(id: string) : Promise<void>;
}