import { Header } from "../../compents/Header";

export function Home() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Linktree!</h1>
      <p className="text-lg text-gray-700">
        Crie e gerencie seus links de forma fácil e rápida.
      </p>
    </div>
  );
}