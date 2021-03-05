import { Permission } from "@prisma/client";
import { IRules, rule } from "graphql-shield";
import { hasPermission } from "../graphql/shield";
import { Context } from "../graphql/types";
import { GroupMutaionArgs } from "./types";

const canCreateGroup = rule()((_parent: unknown, _args: GroupMutaionArgs, ctx: Context) => {
    return hasPermission(ctx, Permission.GROUP_WRITE);
})

export const permissions: IRules = {
    Mutation: {
        group: canCreateGroup,
    },
}
