import { User } from "@/domain/entities/user.entity.js";
import type { IUserRepository } from "@/domain/repositories/user.repository.js";
import type { PrismaClient } from "@/generated/prisma/client.js";

export class PrismaUserRepository implements IUserRepository {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async findByFirebaseId(firebaseId: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {firebaseId},
        })

        if (!user) return null;

        return new User(
            user.id,
            user.firebaseId,
            user.email,
            user.name,
            user.createdAt,
            user.updatedAt,
        );
    }

    async create(data: { firebaseId: string; email: string; name?: string | null; }): Promise<User> {
        const user = await this.prisma.user.create({
            data: {
                firebaseId : data.firebaseId,
                email : data.email,
                name : data.name ?? null,
            },
        });

        return new User(
            user.id,
            user.firebaseId,
            user.email,
            user.name,
            user.createdAt,
            user.updatedAt,
        )
    }

    

}