import { Router } from 'express';
import {
  CreateTaskUseCase,
  GetTasksUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
} from '@/application/use-cases/index.js';
import {
  PrismaTaskRepository,
  PrismaUserRepository,
} from '@/infrastructure/repositories/index.js';
import { TaskController } from '../controllers/task.controller.js';
import { prisma } from '@/infrastructure/database/prisma.client.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator.js';
	

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

taskRoutes.post('/', validate(createTaskSchema), taskController.create);
taskRoutes.get('/', taskController.getAll);
taskRoutes.patch('/:id', validate(updateTaskSchema), taskController.update);
taskRoutes.delete('/:id', taskController.delete);