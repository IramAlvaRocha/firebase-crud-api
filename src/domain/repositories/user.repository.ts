import type { User } from "../entities/user.entity.js";

export interface IUserRepository {
    findByFirebaseId(firebaseId: string) : Promise<User | null>;
    create( data: { firebaseId: string; email: string; name?: string | null } ) : Promise<User>;
}