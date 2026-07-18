import { Link } from "react-router"
import { Input } from "../../compents/Imput"

export function Login() {
    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1 className="flex items-center mt-11 text-black md:text-4xl text-5xl font-black">
                    Pixel<span
                        className="flex bg-linear-to-r from-green-800 to-green-600 bg-clip-text text-transparent"
                    >Sync</span>
                </h1>
            </Link>

            <form className="flex flex-col gap-4 w-full max-w-sm mt-8 p-2">
                <Input 
                    type="email"
                    placeholder="Digite seu email"
                />

                <Input 
                    type="password"
                    placeholder="Digite sua senha"
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