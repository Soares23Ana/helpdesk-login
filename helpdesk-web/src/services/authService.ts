import type { AuthResponse, AuthUser, LoginInput } from "../types/Auth"

const API_URL = import.meta.env.VITE_API_URL

const TOKEN_KEY = "access_token"

export async function login(input: LoginInput): Promise<AuthResponse> {

    const response = await fetch(
        `${API_URL}/auth`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
    )

    if (!response.ok) {
        throw new Error(
            response.status === 403
                ? "E-mail ou senha inválidos"
                : `Erro ao fazer login: ${response.status}`
        )
    }

    const data: AuthResponse = await response.json()

    if (!data.access_token) {
        throw new Error("A API não retornou o access_token")
    }

    // Guarda o token para as próximas requisições (ticketService usa a mesma chave)
    localStorage.setItem(TOKEN_KEY, data.access_token)

    return data
}

export async function me(): Promise<AuthUser> {

    const response = await fetch(
        `${API_URL}/me`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        }
    )

    if (!response.ok) {
        throw new Error(`Erro ao buscar usuário: ${response.status}`)
    }

    return response.json()
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function isAuthenticated() {
    return getToken() !== null
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY)
}

export const authService = {
    login,
    me,
    getToken,
    isAuthenticated,
    logout
}
