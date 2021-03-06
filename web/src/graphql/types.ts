export interface AuthPayload {
    access_token: string
    expires_in: number
    token_type: string
}

export interface LoginVars {
    username: string
    password: string
}
