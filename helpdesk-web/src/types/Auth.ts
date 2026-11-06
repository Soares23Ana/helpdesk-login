export type LoginInput = {
    email: string
    password: string
    admin?: boolean
}

// Resposta do POST /auth do JSON REST Server
export type AuthResponse = {
    access_token: string
    refresh_token: string
    type: string
}

// Resposta do GET /me (usuario logado, sem a senha)
export type AuthUser = {
    id: number
    name: string
    email: string
    role: string
}
