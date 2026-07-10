import { Router } from 'express';
import { PrismaTaskRepository } from '@/infrastructure/repositories/prisma-task.repository.js';
import { PrismaUserRepository } from '@/infrastructure/repositories/prisma-user.repository.js';
import { CreateTaskUseCase } from '@/application/use-cases/create-task.use-case.js';
import { GetTasksUseCase } from '@/application/use-cases/get-tasks.use-case.js';
import { UpdateTaskUseCase } from '@/application/use-cases/update-task.use-case.js';
import { DeleteTaskUseCase } from '@/application/use-cases/delete.task.use-case.js';
import { TaskController } from '../controllers/task.controller.js';
import { prisma } from '@/infrastructure/database/prisma.client.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const taskRepository = new PrismaTaskRepository(prisma);
const userRepository = new PrismaUserRepository(prisma);

const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const getTasksUseCase = new GetTasksUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

const taskController = new TaskController(
  createTaskUseCase,
  getTasksUseCase,
  updateTaskUseCase,
  deleteTaskUseCase,
  userRepository,
);

export const taskRoutes: Router = Router();

taskRoutes.use(authMiddleware);

taskRoutes.post('/', taskController.create);
taskRoutes.get('/', taskController.getAll);
taskRoutes.patch('/:id', taskController.update);
taskRoutes.delete('/:id', taskController.delete);