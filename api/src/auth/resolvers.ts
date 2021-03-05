import { Group } from "@prisma/client";
import { AuthPayload } from "./types";
import { AuthService, GroupService } from "./service";
import { GroupMutaionArgs } from "./types";

const authService = AuthService.getInstance();
const groupService = GroupService.getInstance();

export const resolvers = {
    Mutation: {
        login(_parent: unknown, args: { username: string, password: string }): Promise<AuthPayload> {
            return authService.login(args.username, args.password);
        },
        group(_parent: unknown, args: GroupMutaionArgs): Promise<Group> | void {
            return groupService.createGroup(args.group);
        }
    }
}
