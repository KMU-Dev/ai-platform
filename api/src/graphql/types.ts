import { Prisma } from "@prisma/client";

export type UserWithGroup = Prisma.UserGetPayload<{
    include: { group: true }
}>
export interface Context {
    user?: UserWithGroup;
}
