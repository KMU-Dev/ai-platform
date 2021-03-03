import { gql } from "apollo-server-express";

export const typeDefs = gql`
    scalar Date

    interface Manager {
        instances: [Instance!]!
        quota: Quota
    }

    type Query

    type Mutation {
        # auth
        login(username: String!, password: String!): AuthPayload!
    }

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

    # This group is for permission
    type Group {
        id: ID!
        name: String!
        members: [User!]!
        permissions: [Permission!]!
        createdAt: Date!
    }

    type Quota {
        cpu: Float!
        memory: Int!
        gpu: Int!
    }

    type AuthPayload {
        access_token: String!
        expires_in: Int!
        token_type: String!
    }

    enum Permission {
        # System related permissions
        # Quota related permissions
        QUOTA_DELEGATE
        QUOTA_ALLOCATE


        # User related permisions
        # All write permissions don't include quota delegatation permission
        USER_READ
        USER_CREATE
        USER_UPDATE
        USER_DELETE

        # Group related permissions
        # All write permissions don't include quota delegatation permission
        GROUP_READ
        GROUP_WRITE
        GROUP_DELETE
    }
`;
