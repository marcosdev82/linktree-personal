import { useState, useContext } from "react";
import { Link } from "react-router";
import { Input } from "../../compents/Imput";

/** Contexts */
import { Context } from "../../contexts/UserContext";

export function Register() {

  const [user, setUser] = useState({})
  const { register } = useContext(Context);
  const shake = false

  
  function handleChange(e) {
    setUser({
        ...user,
        [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    register(user)
  }

  function isSubmitting() {
    return !user.name || !user.email || !user.password || !user.confirmPassword
  }

 
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-primary-900 via-primary-700 to-primary-500 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
        <div
          className={`w-full rounded-3xl border border-secondary-white/15 bg-secondary-white/95 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm ${
            shake ? "animate-[shake_0.45s_ease-in-out_1]" : ""
          }`}
        >
          <Link to="/" className="block text-center">
            <h1 className="flex items-center justify-center text-4xl font-black text-secondary-black">
              Pixel
              <span className="bg-linear-to-r from-primary-700 to-primary-300 bg-clip-text text-transparent">
                Sync
              </span>
            </h1>
          </Link>

          <p className="mt-3 text-center text-sm text-secondary-gray">Crie sua conta para começar.</p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            {/* {feedback && (
              <div className="w-full rounded-lg border border-secondary-red/20 bg-secondary-red/10 px-3 py-2 text-sm text-secondary-red shadow-sm animate-[pulse_0.8s_ease-in-out_1]">
                <span className="font-semibold">Atenção:</span> {feedback}
              </div>
            )} */}

            <Input
              type="text"
              name="name"
              placeholder="Seu nome"
              className="border-secondary-lightGray bg-secondary-white focus:border-primary-500 focus:ring-primary-200"
              onChange={handleChange}
            />
            {/* {errors.name && <span className="text-sm text-secondary-red">{errors.name.message}</span>} */}

            <Input
              type="email"
              name="email"
              placeholder="Digite seu email"
              className="border-secondary-lightGray bg-secondary-white focus:border-primary-500 focus:ring-primary-200"
              onChange={handleChange}
            />
            {/* {errors.email && <span className="text-sm text-secondary-red">{errors.email.message}</span>} */}

            <Input
              type="password"
              name="password"
              placeholder="Senha"
              className="border-secondary-lightGray bg-secondary-white focus:border-primary-500 focus:ring-primary-200"
              onChange={handleChange}
            />
            {/* {errors.password && <span className="text-sm text-secondary-red">{errors.password.message}</span>} */}

            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              className="border-secondary-lightGray bg-secondary-white focus:border-primary-500 focus:ring-primary-200"
              onChange={handleChange}
            />
            {/* {errors.confirmPassword && (
              <span className="text-sm text-secondary-red">{errors.confirmPassword.message}</span>
            )} */}

            <button
              type="submit"
              disabled={isSubmitting()}
              className="h-11 w-full rounded-xl bg-primary-900 font-bold text-secondary-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Criando conta..." : "Criar conta"}
            </button>

            <p className="text-center text-sm text-secondary-gray">
              Já tem conta?{" "}
              <Link to="/login" className="font-semibold text-primary-700 hover:text-primary-500">
                Entrar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
