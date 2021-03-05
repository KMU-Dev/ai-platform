import { User } from "@prisma/client";
import { BCryptService } from "../service/crypt";
import { prisma } from "../utils/prisma";
import { permissions } from "./authorization";
import { UserInput } from "./types";

export class UserService {
    private static instance: UserService;

    private bcryptService = BCryptService.getInstance();
    
    private constructor() {}

    static getInstance(): UserService {
        return this.instance || (this.instance = new this());
    }

    async createUser(user: UserInput, groupId?: string): Promise<User> {
        if (!groupId) {
            const group = await prisma.group.findFirst({ where: { default: true }, select: { id: true }});
            groupId = group?.id;
        }

        return await prisma.user.create({
            data: {
                username: user.username,
                password: await this.bcryptService.hashPassword(user.password),
                name: user.name,
                email: user.email,
                quota: {
                    create: {
                        cpu: 0,
                        memory: 0,
                        gpu: 0,
                    },
                },
                group: {
                    connect: { id: groupId }
                }
            },
        })
    }
}
