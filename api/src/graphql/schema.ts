import { gql } from "apollo-server-express";

export const typeDefs = gql`
    scalar Date

    interface Manager {
        instances: [Instance!]!
        quota: Quota
    }

    type Query

    type Mutation

    type Organization implements Manager {
        id: ID!
        name: String!
        members: [User!]!
        instances: [Instance!]!
        quota: Quota
        createdAt: Date!
    }

    type Instance {
        id: ID!
        name: String!
        image: String!
        owner: Manager!
        logs: [LogLine!]!
        createdAt: Date!
    }

    type LogLine {
        id: ID!
        instance: Instance!
        lineNumber: Int!
        content: String!
        time: Date!
    }

    type Quota {
        cpu: Float!
        memory: Int!
        gpu: Int!
    }
`;
