import { Quota, User } from "@prisma/client";
import { QuotaService } from "../service/quota";
import { UserService } from "./service";
import { UserInput } from "./types";

const userService = UserService.getInstance();
const quotaService = QuotaService.getInstance();

export const resolvers = {
    Mutation: {
        user(_parent: unknown, args: { user: UserInput }): Promise<User> {
            return userService.createUser(args.user);
        }
    },
    User: {
        quota(parent: User): Promise<Quota> {
            return quotaService.getUserQuota(parent);
        }
    },
};
