import { Permission } from "@prisma/client";
import { ForbiddenError } from "apollo-server-errors";
import { shield } from "graphql-shield"
import { merge } from "lodash"
import { authPermissions, authValidaitons } from "../auth";
import { userPermissions, userValidations } from "../user";

export const validations = shield(merge(authValidaitons, userValidations), { allowExternalErrors: true });
export const permissions = shield(
    merge(authPermissions, userPermissions),
    {
        allowExternalErrors: true,
        fallbackError: new ForbiddenError("Permission denied."),
    }
);
