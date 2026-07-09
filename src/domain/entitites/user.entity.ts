export class User {
    constructor(
        public readonly id: string,
        public readonly firebaseId: string,
        public readonly email: string,
        public readonly name: string | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ){}
}