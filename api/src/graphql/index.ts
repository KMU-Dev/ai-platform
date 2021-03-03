import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import { makeExecutableSchema } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { applyMiddleware } from "graphql-middleware";
import { JWTService } from "../service/token";
import { prisma } from "../utils/prisma";
import { userResolvers, userTypeDef } from "../user";
import { merge } from "lodash";
import { validations } from "./shield";

const rawSchema = makeExecutableSchema({
    typeDefs: [typeDefs, userTypeDef],
    resolvers: merge(resolvers, userResolvers),
});

const schema = applyMiddleware(rawSchema, validations);

const jwtService = JWTService.getInstance();

export const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginInlineTrace],
    context: async ({ req }) => {
        const header = req.headers.authorization || "";
        if (!(header && header.startsWith("Bearer "))) return;

        const token = header.replace("Bearer ", "");
        const decodedToken = jwtService.decode(token);
        const userId = decodedToken.sub as string;

        const user = await prisma.user.findUnique({ where: { id: userId }});

        return ({ user });
    },
    formatError: (err) => {
        console.error(err);
        return err;
    },
});
