import { User } from "@prisma/client";
import { UserService } from "./service";
import { UserInput } from "./types";

const userService = UserService.getInstance();

export const resolvers = {
    Mutation: {
        user(_parent: unknown, args: { user: UserInput }): Promise<User> {
            return userService.createUser(args.user);
        },
    }
};
