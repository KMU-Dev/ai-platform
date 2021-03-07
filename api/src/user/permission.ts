import { Permission, User } from "@prisma/client";
import { IRules, rule } from "graphql-shield";
import { hasPermission } from "../auth";
import { Context } from "../graphql/types";

const canReadQuota = rule()((parent: User, _args: unknown, ctx: Context) => {
    return parent.id === ctx.user?.id || hasPermission(ctx, Permission.USER_READ);
});

export const permissions: IRules = {
    User: {
        quota: canReadQuota,
    },
};
