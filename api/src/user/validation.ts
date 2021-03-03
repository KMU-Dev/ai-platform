import { UserInputError } from "apollo-server-express";
import { and, inputRule, IRules, rule } from "graphql-shield";
import { prisma } from "../utils/prisma";
import { messages } from "../utils/yup";
import { UserInput } from "./types";

const isUserDuplicated = rule()(async (_parent, args: {user: UserInput}) => {
    const usernameCount = await prisma.user.count({
        where: { username: args.user.username },
    });

    if (usernameCount !== 0) return new UserInputError("Username has been taken.");

    const emailCount = await prisma.user.count({
        where: { email: args.user.email },
    });

    return emailCount === 0 || new UserInputError("Email has been taken.");
});

const isUserValid = inputRule()(yup =>
    yup.object({
        user: yup.object({
            username: yup.string()
                    .required(messages.required("username"))
                    .max(16, messages.max("username")),
            password: yup.string()
                    .required(messages.required("password"))
                    .max(64, messages.max("password")),
            name: yup.string()
                    .required(messages.required("name"))
                    .max(64, messages.max("name")),
            email: yup.string()
                    .required(messages.required("email"))
                    .max(256, messages.max("email"))
                    .email(messages.email()),
        }),
    })
);

export const validations: IRules = {
    Mutation: {
        user: and(isUserValid, isUserDuplicated),
    }
};