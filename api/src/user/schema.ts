import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Query {
        users: [User!]!
    }

    extend type Mutation {
        user(user: UserInput): User!
    }

    type User implements Manager {
        id: ID!
        username: String!
        name: String!
        email: String!
        group: Group!
        organizations: [Organization!]!
        instances: [Instance!]!
        quota: Quota!
        createdAt: Date!
    }

    input UserInput {
        username: String!
        password: String!
        name: String!
        email: String!
    }
`;