import bcrypt from "bcrypt";

export class BCryptService {
    private static instance: BCryptService;

    private readonly saltRounds = 12;

    private constructor() {}

    public static getInstance(): BCryptService {
        return this.instance || (this.instance = new this());
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
