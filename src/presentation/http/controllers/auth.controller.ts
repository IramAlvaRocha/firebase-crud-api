import type { SyncUserUseCase } from "@/application/use-cases/index.js";
import type { Request, Response } from "express";

export class AuthController {
 
    private readonly syncUserUserCase: SyncUserUseCase;

    constructor(syncUserUserCase: SyncUserUseCase){
        if(!syncUserUserCase) throw new Error("Invalid dependencies. All dependencies must be provided.");
        this.syncUserUserCase = syncUserUserCase;
    };

    sync = async (req: Request, res: Response) : Promise<void> => {
        if(!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const { uid, email, name } = req.user;

        if(!email) {
            res.status(400).json({ error: "Token does not contain an email" });
            return;
        }

        const user = await this.syncUserUserCase.execute({
            firebaseId: uid,
            email: email,
            name: name ?? null,
        });

        res.status(200).json({ user });
        
    };

}