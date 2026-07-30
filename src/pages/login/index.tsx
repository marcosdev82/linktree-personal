import { Link, useNavigate } from "react-router"
import { Input } from "../../compents/Imput"
import { useState, type FormEventHandler } from "react"

// @ts-ignore
import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth"

export function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [feedback, setFeedback] = useState<string | null>(null)
    const navigation = useNavigate()

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        if (email === "" || password === "") {
            setFeedback("Preencha todos os campos para continuar.")
            setTimeout(() => setFeedback(null), 3000)
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Signed in
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

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mt-8 p-2">
                {feedback && (
                    <div className="w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 shadow-sm animate-[pulse_0.8s_ease-in-out_1]">
                        <span className="font-semibold">Atenção:</span> {feedback}
                    </div>
                )}

                <Input 
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input 
                    type="password"
                    placeholder="*******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button 
                    type="submit"
                    className="w-full h-9 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-colors">
                    Acessar
                </button>
            </form>
        </div>
    )
}