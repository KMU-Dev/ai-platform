/* export enum Permission {
    // System related permissions
    // Quota related permissions
    QUOTA_DELEGATE = "QUOTA_DELEGATE",
    QUOTA_ALLOCATE = "QUOTA_ALLOCATE",
  
  
    // User related permisions
    // All write permissions don't include quota delegatation permission
    USER_READ = "USER_READ",
    USER_CREATE = "USER_CREATE",
    USER_UPDATE = "USER_UPDATE",
    USER_DELETE = "USER_DELETE",
  
    // Organization related permissions
    // All write permissions don't include quota delegatation permission
    ORGANIZATION_READ = "ORGANIZATION_READ",
    ORGANIZATION_WRITE = "ORGANIZATION_WRITE",
    ORGANIZATION_DELETE = "ORGANIZATION_DELETE",
  
    // Instance related permissions
    INSTANCE_READ = "INSTANCE_READ",
    INSTANCE_DELETE = "INSTANCE_DELETE",
  
    // permission group related permissions
    GROUP_CREATE = "GROUP_CREATE",
    GROUP_WRITE = "GROUP_WRITE",
    GROUP_DELETE = "GROUP_DELETE",
} */

import { Permission } from "@prisma/client";

export interface GroupInput {
    name: string
    members?: string[]
    permissions?: Permission[]
    default?: boolean
}

export interface GroupMutaionArgs {
    group: GroupInput
}

export interface AuthPayload {
    access_token: string
    expires_in: number
    token_type: string
}