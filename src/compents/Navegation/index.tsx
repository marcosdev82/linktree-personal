import { Link } from "react-router";

export function Navegation() {
    return (
        <div className="flex flex-col bg-gray-100 w-full">
            <nav className=" bg-white shadow-md flex justify-start py-4 px-4">
                <Link to="/admin/social" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Links</Link>
                <Link to="/admin/aparence" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Aparência</Link>
                <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Configurações</Link>
            </nav>
        </div>
    );
}