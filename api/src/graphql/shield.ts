import { Permission } from "@prisma/client";
import { ForbiddenError } from "apollo-server-errors";
import { shield } from "graphql-shield"
import { merge } from "lodash"
import { authPermissions, authValidaitons } from "../auth";
import { userPermissions, userValidations } from "../user";
import { Context } from "./types";

export const hasPermission = (ctx: Context, permission: Permission): boolean => {
    const permissions = ctx.user?.group.permissions;
    if (permissions) return permissions.includes(permission);
    return false;
}

export const validations = shield(merge(authValidaitons, userValidations), { allowExternalErrors: true });
export const permissions = shield(
    merge(authPermissions, userPermissions),
    {
        allowExternalErrors: true,
        fallbackError: new ForbiddenError("Permission denied."),
    }
);
