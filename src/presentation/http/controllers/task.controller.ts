import type { CreateTaskUseCase } from "@/application/use-cases/create-task.use-case.js";
import type { GetTasksUseCase } from "@/application/use-cases/get-tasks.use-case.js";
import type { UpdateTaskUseCase } from "@/application/use-cases/update-task.use-case.js";
import type { DeleteTaskUseCase } from "@/application/use-cases/delete.task.use-case.js";
import type { IUserRepository } from "@/domain/repositories/user.repository.js";
import type { Request, Response } from "express";

export class TaskController {
    
    private readonly createTaskUseCase: CreateTaskUseCase;
    private readonly getTasksUseCase: GetTasksUseCase;
    private readonly updateTaskUseCase: UpdateTaskUseCase;
    private readonly deleteTaskUseCase: DeleteTaskUseCase;
    private readonly userRepository: IUserRepository;   

    constructor(createTaskUseCase: CreateTaskUseCase, getTasksUseCase: GetTasksUseCase, updateTaskUseCase: UpdateTaskUseCase, deleteTaskUseCase: DeleteTaskUseCase, userRepository: IUserRepository){
        this.createTaskUseCase = createTaskUseCase;
        this.getTasksUseCase = getTasksUseCase;
        this.updateTaskUseCase = updateTaskUseCase;
        this.deleteTaskUseCase = deleteTaskUseCase;
        this.userRepository = userRepository;

    }

    private async getInternalUserId(firebaseId: string): Promise<string> {
        const user = await this.userRepository.findByFirebaseId(firebaseId);
        if(!user) throw new Error("User not found");
        return user.id;
    }


    create = async (req: Request, res: Response): Promise<void> => {
        try {
          const userId = await this.getInternalUserId(req.user!.uid);
          const { title, description } = req.body;
    
          const task = await this.createTaskUseCase.execute({ title, description, userId });
          res.status(201).json({ task });
        } catch (error) {
          res.status(400).json({ error: (error as Error).message });
        }
      };
    
      getAll = async (req: Request, res: Response): Promise<void> => {
        try {
          const userId = await this.getInternalUserId(req.user!.uid);
          const tasks = await this.getTasksUseCase.execute(userId);
          res.status(200).json({ tasks });
        } catch (error) {
          res.status(400).json({ error: (error as Error).message });
        }
      };
    
      update = async (req: Request, res: Response): Promise<void> => {
        try {
          const userId = await this.getInternalUserId(req.user!.uid);
          const { id } = req.params;
          const { title, description, completed } = req.body;
    
          const task = await this.updateTaskUseCase.execute({
            taskId: id as string,
            userId,
            title,
            description,
            completed,
          });
          res.status(200).json({ task });
        } catch (error) {
          const message = (error as Error).message;
          const status = message.includes('Forbidden') ? 403 : message.includes('not found') ? 404 : 400;
          res.status(status).json({ error: message });
        }
      };
    
      delete = async (req: Request, res: Response): Promise<void> => {
        try {
          const userId = await this.getInternalUserId(req.user!.uid);
          const { id } = req.params;
    
          await this.deleteTaskUseCase.execute({ taskId: id as string, userId });
          res.status(204).send();
        } catch (error) {
          const message = (error as Error).message;
          const status = message.includes('Forbidden') ? 403 : message.includes('not found') ? 404 : 400;
          res.status(status).json({ error: message });
        }
      };
}