import type { User } from "@/domain/entities/user.entity.js";
import type { IUserRepository } from "@/domain/repositories/user.repository.js";

interface SyncUserInput {
    firebaseId: string;
    email: string;
    name?: string | null;
}

export class SyncUserUseCase {
    
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    };

    async execute(input: SyncUserInput) : Promise<User> {
        const existingUser = await this.userRepository.findByFirebaseId(input.firebaseId);

        if(existingUser) return existingUser;

        return this.userRepository.create({
            firebaseId: input.firebaseId,
            email: input.email,
            name: input.name ?? null,
        });

    }
}