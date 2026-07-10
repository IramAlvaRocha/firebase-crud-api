import { Task } from "@/domain/entities/task.entity.js";
import type { CreateTaskData, ITaskRepository, UpdateTaskData } from "@/domain/repositories/task.repository.js";
import type { PrismaClient } from "@/generated/prisma/client.js";

export class PrismaTaskRepository implements ITaskRepository {
    
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient){
        this.prisma = prisma;
    }

    private toDomain(task: {
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      }): Task {
        return new Task(
          task.id,
          task.title,
          task.description,
          task.completed,
          task.userId,
          task.createdAt,
          task.updatedAt,
        );
      }

    async findAllByUserId(userId: string): Promise<Task[]> {
        const tasks = await this.prisma.task.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        return tasks.map(this.toDomain);
    }

    async findById(id: string): Promise<Task | null> {
        const task = await this.prisma.task.findUnique({
            where: { id }
        });

        return task ? this.toDomain(task) : null;
    }
    async create(data: CreateTaskData): Promise<Task> {
        const task = await this.prisma.task.create({
            data: {
                title: data.title,
                description: data.description ?? null,
                userId: data.userId,
            },
        });

        return this.toDomain(task);
    }
    async update(id: string, data: UpdateTaskData): Promise<Task> {
        const task = await this.prisma.task.update({
            where: { id },
            data
        });
        return this.toDomain(task);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.task.delete({ where: { id } });
    }
}