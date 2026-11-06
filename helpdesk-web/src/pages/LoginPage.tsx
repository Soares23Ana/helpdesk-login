import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router"
import { authService } from "../services/authService"

export function LoginPage(){

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [admin, setAdmin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)

    async function handleSubmit(event: FormEvent<HTMLFormElement>){

        event.preventDefault()

        if(!email.trim() || !password.trim()){
            setError("Informe o e-mail e a senha")
            return
        }

        try{
            setLoading(true)
            setError(null)

            const data = await authService.login({ email, password, admin })

            setToken(data.access_token)

        } catch(err) {

            setError(
                err instanceof Error
                ? err.message
                : "Não foi possível fazer login"
            )

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">

            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">

                <h1 className="text-3xl font-bold text-slate-900">
                    HelpDesk Lite
                </h1>

                <p className="mt-2 text-slate-600">
                    Entre com sua conta para acessar os chamados.
                </p>

                <form onSubmit={handleSubmit} className="mt-8">

                    <div className="mb-5">
                        <label htmlFor="email"
                            className="mb-2 block font-medium text-slate-700"
                        >
                            E-mail
                        </label>
                        <input id="email" type="email" value={email}
                            autoComplete="username"
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2
                            outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password"
                            className="mb-2 block font-medium text-slate-700"
                        >
                            Senha
                        </label>
                        <input id="password" type="password" value={password}
                            autoComplete="current-password"
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2
                            outline-none focus:border-blue-500"
                        />
                    </div>

                    <label className="mb-5 flex items-center gap-2 text-slate-700">
                        <input type="checkbox" checked={admin}
                            onChange={(event) => setAdmin(event.target.checked)}
                        />
                        Entrar como administrador
                    </label>

                    {error && (
                        <div className="mb-5 rounded-lg bg-red-50 p-3 text-red-700">
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-5 py-2 text-white
                        hover:bg-blue-700 disabled:cursor-not-allowed
                        disabled:opacity-50"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>

                </form>

                {token && (
                    <div className="mt-6 rounded-lg bg-green-50 p-4 text-green-800">
                        <p className="font-semibold">
                            Login realizado! access_token recebido:
                        </p>
                        <p className="mt-2 break-all font-mono text-xs">
                            {token}
                        </p>
                        <button type="button"
                            onClick={() => navigate("/chamados")}
                            className="mt-4 rounded-lg bg-green-700 px-4 py-2 text-white
                            hover:bg-green-800"
                        >
                            Ir para os chamados
                        </button>
                    </div>
                )}

            </div>

        </div>
    )

}
