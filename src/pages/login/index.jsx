import { Link, useNavigate } from "react-router"
import { Input } from "../../compents/Imput"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
//import { loginWithEmailAndPassword } from "../../services/auth"

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
    const [shake, setShake] = useState(false)
    const shakeTimeoutRef = useRef(null)
    const navigation = useNavigate()

    function triggerShake() {
        setShake(false)
        setShake(true)

        if (shakeTimeoutRef.current) {
            window.clearTimeout(shakeTimeoutRef.current)
        }

        shakeTimeoutRef.current = window.setTimeout(() => setShake(false), 450)
    }

    const onSubmit = ({ email, password }) => {
        // loginWithEmailAndPassword(email, password)
        //     .then(() => {
        //         console.log("User logged in:")
        //         navigation("/admin", { replace: true })

        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.error("Error logging in:", errorCode, errorMessage)
        //         setFeedback("E-mail ou senha inválidos. Tente novamente.")
        //         triggerShake()
        //         setTimeout(() => setFeedback(null), 4000)
        //     });
    }

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-primary-900 via-primary-700 to-primary-500 px-4 py-10">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
                <div className={`w-full rounded-3xl border border-secondary-white/15 bg-secondary-white/95 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm ${shake ? "animate-[shake_0.45s_ease-in-out_1]" : ""}`}>
                    <Link to="/" className="block text-center">
                        <h1 className="flex items-center justify-center text-4xl font-black text-secondary-black">
                            Pixel<span className="bg-linear-to-r from-primary-700 to-primary-300 bg-clip-text text-transparent">
                                Sync
                            </span>
                        </h1>
                    </Link>

                    <p className="mt-3 text-center text-sm text-secondary-gray">
                        Acesse o painel com sua conta.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
                {feedback && (
                    <div className="w-full rounded-lg border border-secondary-red/20 bg-secondary-red/10 px-3 py-2 text-sm text-secondary-red shadow-sm animate-[pulse_0.8s_ease-in-out_1]">
                        <span className="font-semibold">Atenção:</span> {feedback}
                    </div>
                )}

                <Input
                    type="email"
                    placeholder="Digite seu email"
                    className="border-secondary-lightGray bg-secondary-white focus:border-primary-500 focus:ring-primary-200"
                    {...register("email")}
                />
                {errors.email && (
                    <span className="text-sm text-secondary-red">{errors.email.message}</span>
                )}

                <Input
                    type="password"
                    placeholder="*******"
                    className="border-secondary-lightGray bg-secondary-white focus:border-primary-500 focus:ring-primary-200"
                    {...register("password")}
                />
                {errors.password && (
                    <span className="text-sm text-secondary-red">{errors.password.message}</span>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-xl bg-primary-900 text-secondary-white font-bold transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70">
                    {isSubmitting ? "Entrando..." : "Acessar"}
                </button>

                <p className="text-center text-sm text-secondary-gray">
                    Ainda não tem conta?{" "}
                    <Link to="/register" className="font-semibold text-primary-700 hover:text-primary-500">
                        Criar conta
                    </Link>
                </p>
                    </form>
                </div>
            </div>
        </div>
    )
}