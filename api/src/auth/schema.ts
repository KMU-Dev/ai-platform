import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Mutation {
        login(username: String!, password: String!): AuthPayload!
        group(group: GroupInput!): Group!
    }

    # This group is for permission
    type Group {
        id: ID!
        name: String!
        members: [User!]!
        permissions: [Permission!]!
        default: Boolean!
        createdAt: Date!
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

        # Organization related permissions
        # All write permissions don't include quota delegatation permission
        ORGANIZATION_READ
        ORGANIZATION_WRITE
        ORGANIZATION_DELETE

        # Instance related permissions
        INSTANCE_READ
        INSTANCE_DELETE

        # permission group related permissions
        GROUP_READ
        GROUP_WRITE
        GROUP_DELETE
    }

    type AuthPayload {
        access_token: String!
        expires_in: Int!
        token_type: String!
    }

    input GroupInput {
        name: String!
        members: [ID]
        permissions: [Permission]
        default: Boolean
    }
`;