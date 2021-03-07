export interface AuthPayload {
    access_token: string
    expires_in: number
    token_type: string
}

export interface LoginVars {
    username: string
    password: string
}

export interface UserInput {
    username: string
    password: string
    name: string
    email: string
}

export interface User {
    id: string
    username: string
    name: String
    email: String
    // group: Group
    // organizations: [Organization]
    // instances: [Instance]
    quota: Quota
    createdAt: Date
}

export interface Quota {
    cpu: number
    memory: number
    gpu: number
}
