import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { AuthController } from '../controllers/auth.controller.js';
import { PrismaUserRepository } from '../../../infrastructure/repositories/prisma-user.repository.js';
import { SyncUserUseCase } from '@/application/use-cases/sync-user.use-case.js';
import { prisma } from '@/infrastructure/database/prisma.client.js';

const userRepository = new PrismaUserRepository(prisma);
const syncUserUseCase = new SyncUserUseCase(userRepository);
const authController = new AuthController(syncUserUseCase);

export const authRoutes: Router = Router();

authRoutes.post('/sync', authMiddleware, authController.sync);