import { Prisma } from "@prisma/client";

export type UserWithGroup = Prisma.UserGetPayload<{
    include: { group: true }
}>

export type UserQuota = Prisma.UserGetPayload<{
    include: { quota: true },
    select: { quota: true },
}>

export interface UserInput {
    username: string
    password: string
    name: string
    email: string
}
