import { Link } from "react-router";

export function Navibar() {
    return (
        <nav className="flex justify-start gap-10">
            <Link to="/admin/social" className="text-white hover:text-gray-200">
                Links</Link>
            <Link to="/admin/aparence" className="text-white hover:text-gray-200">
                Aparência</Link>
            <Link to="/admin" className="text-white hover:text-gray-200">
                Configurações</Link>
        </nav>      
    )
}

export const Navegation = Navibar;