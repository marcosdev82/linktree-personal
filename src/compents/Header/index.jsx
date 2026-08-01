import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router"

import { logout } from "../../services/auth"
import { Navibar } from "../Navibar"

 

export function Header() {

    async function handleLogout() {
        logout()
    }

    return (
        <header className="fixed left-0 top-0 z-50 flex h-14 w-full items-center justify-between bg-primary-900 px-3 text-secondary-white">

            <Link to="/">
                <h1 className="flex origin-left scale-90 items-center text-2xl font-black text-secondary-white md:text-3xl">
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

 