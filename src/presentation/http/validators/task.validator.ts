import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    description: z.string().trim().max(100).nullable().optional(),
});

export const updateTaskSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(255, "Title must be less than 255 characters").optional(),
    description: z.string().trim().max(1000).nullable().optional(),
    completed: z.boolean().optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;