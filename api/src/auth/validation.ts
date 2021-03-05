import { and, inputRule, IRules, rule } from "graphql-shield";
import { messages } from "../utils/yup";
import { Permission } from "@prisma/client";
import { GroupMutaionArgs } from "./types";
import { prisma } from "../utils/prisma";
import { UserInputError } from "apollo-server-errors";

const isLoginValid = inputRule()(yup =>
    yup.object({
          username: yup.string()
                  .required(messages.required("username"))
                  .min(4, messages.min("username"))
                  .max(16, messages.max("username")),
          password: yup.string()
                  .required(messages.required("password"))
                  .min(8, messages.min("password"))
                  .max(64, messages.max("password")),
    })  
);

const isGroupValid = inputRule()(yup =>
    yup.object({
        group: yup.object({
            name: yup.string()
                    .required(messages.required("name"))
                    .max(64, messages.max("name")),
            members: yup.array()
                    .max(100, "You can only add ${max} members to group one time.")
                    .of(
                        yup.string()
                                .required(messages.required("members item"))
                                .uuid(messages.uuid("members item"))
                    ),
            permissions: yup.array()
                    .of(
                        yup.string()
                                .required(messages.required("permissions item"))
                                .oneOf(Object.values(Permission), messages.oneOf("permissions item"))
                    ),
            default: yup.boolean(),
        })
    })
);

const isGroupNotCollide = rule()(async (_parent: unknown, args: GroupMutaionArgs) => {
    const nameCount = await prisma.group.count({
        where: {
            name: args.group.name,
        },
    });

    return nameCount === 0 || new UserInputError("Group name has been taken");
})
  
export const validations: IRules = {
    Mutation: {
        login: isLoginValid,
        group: and(isGroupValid, isGroupNotCollide),
    }
};