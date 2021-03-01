import { AuthenticationError } from "apollo-server-express";
import { prisma } from "../utils/prisma";
import { BCryptService } from "../service/crypt";
import { JWTService } from "../service/token";
import { dateScalar } from "./scalars";
import { AuthPayload } from "./types";

const bcryptService = BCryptService.getInstance();
const jwtService = JWTService.getInstance();

export const resolvers = {
    Date: dateScalar,
    Mutation: {
        async login(_parent: unknown, args: { username: string, password: string }): Promise<AuthPayload> {
            const user = await prisma.user.findUnique({
                where: {
                    username: args.username,
                },
            });

            if (user) {
                const isValid = await bcryptService.comparePassword(args.password, user.password);

                if (isValid) {
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
};
