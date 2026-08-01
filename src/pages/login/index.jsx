import { Link, useNavigate } from "react-router"
import { Input } from "../../compents/Imput"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { loginWithEmailAndPassword } from "../../services/auth"

const loginSchema = z.object({
    email: z.email("Digite um e-mail válido."),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
})

export function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const [feedback, setFeedback] = useState(null)
    const navigation = useNavigate()

    const onSubmit = ({ email, password }) => {
        loginWithEmailAndPassword(email, password)
            .then(() => {
                console.log("User logged in:")
                navigation("/admin", { replace: true })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error logging in:", errorCode, errorMessage)
                setFeedback("E-mail ou senha inválidos. Tente novamente.")
                setTimeout(() => setFeedback(null), 4000)
            });
    }

    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1 className="flex items-center mt-11 text-black md:text-4xl text-5xl font-black">
                    Pixel<span
                        className="flex bg-linear-to-r from-green-800 to-green-600 bg-clip-text text-transparent"
                    >Sync</span>
                </h1>
            </Link>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm mt-8 p-2">
                {feedback && (
                    <div className="w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 shadow-sm animate-[pulse_0.8s_ease-in-out_1]">
                        <span className="font-semibold">Atenção:</span> {feedback}
                    </div>
                )}

                <Input
                    type="email"
                    placeholder="Digite seu email"
                    {...register("email")}
                />
                {errors.email && (
                    <span className="text-sm text-red-600">{errors.email.message}</span>
                )}

                <Input
                    type="password"
                    placeholder="*******"
                    {...register("password")}
                />
                {errors.password && (
                    <span className="text-sm text-red-600">{errors.password.message}</span>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-9 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-colors disabled:cursor-not-allowed disabled:opacity-70">
                    {isSubmitting ? "Entrando..." : "Acessar"}
                </button>
            </form>
        </div>
    )
}