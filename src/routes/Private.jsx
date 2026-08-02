import { useEffect, useState } from "react";
import { Navigate } from "react-router";
//import { fetchCurrentUser } from "../services/auth";

export function Private({children}) {

    const [loading, setLoading] = useState(true);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        let isMounted = true;

        // void fetchCurrentUser().then((user) => {
        // //     if (!isMounted) return;
        //
        // //     if (user) {
        // //         localStorage.setItem("@linktree", JSON.stringify(user));
        // //         setSignedIn(true);
        // //     } else {
        // //         setSignedIn(false);
        // //     }
        //
        // //     setLoading(false);
        // });

        return () => {
            isMounted = false;
        };
    }, [])

    if (loading) {
        return (
            <div className="flex h-full min-h-0 w-full items-center justify-center px-4">
                <div className="w-full max-w-sm rounded-2xl border border-green-100 bg-white/85 p-8 text-center shadow-lg backdrop-blur-sm">
                    <h1 className="flex items-center justify-center text-black md:text-4xl text-5xl font-black">
                        Pixel<span
                            className="flex bg-linear-to-r from-green-800 to-green-600 bg-clip-text text-transparent"
                        >Sync</span>
                    </h1>

                    <div className="mt-6 flex justify-center" aria-hidden="true">
                        <div className="h-12 w-12 rounded-full border-4 border-green-100 border-t-green-600 animate-spin" />
                    </div>

                    <p className="mt-4 text-sm font-medium text-gray-700 animate-pulse">Preparando seu painel...</p>
                    <span className="mt-1 block text-xs text-gray-500">Isso leva apenas alguns segundos.</span>
                </div>
            </div>
        )
    }

    if (!signedIn) {
        return <Navigate to="/login" replace />
    }

    return children
}