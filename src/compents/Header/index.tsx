import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router"

import { auth } from "../../services/firebaseConnection"
import { signOut } from "firebase/auth"

export function Header() {

    async function handleLogout() {
        await signOut(auth)
        localStorage.removeItem("@linktree")
    }

    return (
        <header className="w-full max-w-2xl mt-4 px-1">
            <nav className="flex w-full items-center rounded-lg border border-green-100 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-sm justify-between">
                <div className="flex gap-4 text-sm font-medium text-gray-700">
                    <Link to="/">Home</Link>
                    <Link to="/admin">Links</Link>
                    <Link to="/admin/social">Redes</Link>
                </div> 

                <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg cursor-pointer">  
                    <BiLogOut size={20} />
                </button>
            </nav>
        </header>
    )
}