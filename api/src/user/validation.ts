import { rule, shield } from "graphql-shield";
import { prisma } from "../utils/prisma";
import { UserInput } from "./types";

const validateUser = rule()(async (_parent, args: UserInput) => {
    const collisionsCount = await prisma.user.count({
        where: {
            OR: [{ username: args.username }, { email: args.email }],
        },
    });
    return collisionsCount === 0;
});

export const validations = shield({
    Mutation: {
        user: validateUser
    }
});