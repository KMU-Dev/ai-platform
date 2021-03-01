import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type User implements Manager {
        id: ID!
        username: String!
        name: String!
        email: String!
        groups: [Group!]!
        organizations: [Organization!]!
        instances: [Instance!]!
        quota: Quota
        createdAt: Date!
    }

    extend type Query {
        users: [User!]!
    }

    extend type Mutation {
        user(user: UserInput): User!
    }
`;