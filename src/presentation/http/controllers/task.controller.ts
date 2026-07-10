import type {
  CreateTaskUseCase,
  GetTasksUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
} from "@/application/use-cases/index.js";
import { UnauthorizedError } from "@/domain/errors/app-error.js";
import type { IUserRepository } from "@/domain/repositories/index.js";
import { type Request, type Response, type NextFunction } from "express";

export class TaskController {
    
    private readonly createTaskUseCase: CreateTaskUseCase;
    private readonly getTasksUseCase: GetTasksUseCase;
    private readonly updateTaskUseCase: UpdateTaskUseCase;
    private readonly deleteTaskUseCase: DeleteTaskUseCase;
    private readonly userRepository: IUserRepository;   

    constructor(createTaskUseCase: CreateTaskUseCase, getTasksUseCase: GetTasksUseCase, updateTaskUseCase: UpdateTaskUseCase, deleteTaskUseCase: DeleteTaskUseCase, userRepository: IUserRepository){
      
      if(!createTaskUseCase || !getTasksUseCase || !updateTaskUseCase || !deleteTaskUseCase || !userRepository) 
        throw new Error("Invalid dependencies. All dependencies must be provided.");
      
        this.createTaskUseCase = createTaskUseCase;
        this.getTasksUseCase = getTasksUseCase;
        this.updateTaskUseCase = updateTaskUseCase;
        this.deleteTaskUseCase = deleteTaskUseCase;
        this.userRepository = userRepository;

    }

    private async getInternalUserId(firebaseId: string): Promise<string> {
        const user = await this.userRepository.findByFirebaseId(firebaseId);
        if(!user) throw new UnauthorizedError("User not synced. Please sync your account first.");
        return user.id;
    }


    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const userId = await this.getInternalUserId(req.user!.uid);
          const { title, description } = req.body;
    
          const task = await this.createTaskUseCase.execute({ title, description, userId });
          res.status(201).json({ task });
        } catch (error) {
          next(error);
        }
      };
    
      getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const userId = await this.getInternalUserId(req.user!.uid);
          const tasks = await this.getTasksUseCase.execute(userId);
          res.status(200).json({ tasks });
        } catch (error) {
          next(error);
        }
      };
    
      update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
          next(error);
        }
      };
    
      delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const userId = await this.getInternalUserId(req.user!.uid);
          const { id } = req.params;
    
          await this.deleteTaskUseCase.execute({ taskId: id as string, userId });
          res.status(204).send();
        } catch (error) {
          next(error);
        }
      };
}