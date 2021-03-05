import { Group } from "@prisma/client";
import { AuthenticationError } from "apollo-server-express";
import { AuthPayload } from "./types";
import { BCryptService } from "../service/crypt";
import { JWTService } from "../service/token";
import { prisma } from "../utils/prisma";
import { GroupInput } from "./types";

export class AuthService {
    private static instance: AuthService

    private constructor() {}

    static getInstance(): AuthService{
        return this.instance || (this.instance = new this());
    }

    async login(username: string, password: string): Promise<AuthPayload> {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (user) {
            const bcryptService = BCryptService.getInstance();
            const isValid = await bcryptService.comparePassword(password, user.password);

            if (isValid) {
                const jwtService = JWTService.getInstance();

                const jwt = jwtService.sign({}, user.id);
                return {
                    access_token: jwt,
                    expires_in: jwtService.getExpiresIn(),
                    token_type: "Bearer",
                }
            }
        }

        throw new AuthenticationError("Invalid username or password!");
    }
}

export class GroupService {
    private static instance: GroupService;

    private constructor() {}

    static getInstance(): GroupService {
        return this.instance || (this.instance = new this);
    }

    async createGroup(group: GroupInput): Promise<Group> {
        return await prisma.group.create({
            data: {
                name: group.name,
                permissions: group.permissions,
                default: group.default,
                members: {
                    connect: group.members?.map(memberId => ({ id: memberId })),
                }
            },
            include: {
                members: true,
            },
        });
    }
}
