import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router"

import { logout } from "../../services/auth"
import { Navibar } from "../Navibar"

 

export function Header() {

    async function handleLogout() {
        logout()
    }

    return (
        <header className="w-full bg-primary-900 text-secondary-white shadow-md flex justify-between items-center px-4 py-2">

            <Link to="/">
                <h1 className="flex items-center mt-11 md:text-4xl text-5xl font-black text-secondary-white">
                    Pixel<span
                        className="flex bg-linear-to-r from-primary-300 to-primary-100 bg-clip-text text-transparent"
                    >Sync</span>
                </h1>
            </Link>

            <div className="flex flex-row items-center justify-center gap-4">
                <Navibar />
                <div className="flex justify-end ml-10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 text-white hover:text-white/70"
                    >
                        <BiLogOut size={20} />
                        Sair
                    </button>
                </div>
            </div>
           
            
        </header>
    )
}

 