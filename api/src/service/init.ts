import { Permission } from "@prisma/client";
import { UserService } from "../user/service";
import { prisma } from "../utils/prisma";

export class InitService {
    private static instance: InitService;

    private userService = UserService.getInstance();

    private constructor () {}

    static getInstance() : InitService {
        return this.instance || (this.instance = new this());
    }

    async init(): Promise<void> {
        // create Default group if not exist
        const defaultGroup = await prisma.group.findFirst({
            where: { default: true },
        });

        if (!defaultGroup) {
            await prisma.group.create({
                data: {
                    name: "Default group",
                    default: true,
                }
            });
        }

        // create System Admin Group if not exist
        let adminGroup = await prisma.group.findUnique({
            where: { name: "System Admin" }
        });

        if (!adminGroup) {
            adminGroup = await prisma.group.create({
                data: {
                    name: "System Admin",
                    permissions: Object.values(Permission),
                },
            });
        }

        // create Admin user if not exist
        const adminUser = await prisma.user.findUnique({
            where: {
                username: "admin"
            }
        });
        
        if (!adminUser) {
            await this.userService.createUser({
                username: "admin",
                password: "!@#$aiplatform%^&*",
                email: "admin@ai.kmu.webzyno.com",
                name: "Admin",
            }, adminGroup.id);
        }
    }
}