import { Quota, User } from "@prisma/client";
import { prisma } from "../utils/prisma";

export class QuotaService {
    private static instance: QuotaService;

    private constructor() {}

    static getInstance(): QuotaService {
        return this.instance || (this.instance = new this());
    }

    async getUserQuota(user: User): Promise<Quota> {
        const quota = await prisma.quota.findFirst({
            where: {
                user,
            }
        });

        if (!quota) throw new QuotaNotFoundError(user.id);
        return quota;
    }
}

export class QuotaNotFoundError extends Error {
    constructor(id: string) {
        super(`Cannot find quota of manager id: ${id}`);
    }
}
