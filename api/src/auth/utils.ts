import { Permission } from "@prisma/client";
import { Context } from "../graphql/types";

export const hasPermission = (ctx: Context, permission: Permission): boolean => {
    const permissions = ctx.user?.group.permissions;
    if (permissions) return permissions.includes(permission);
    return false;
}