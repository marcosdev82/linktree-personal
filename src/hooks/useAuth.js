import auth from "../services/auth"

import { useEffect, useState } from "react"

export default function useAuth() {

    async function register(user) {
        try {
            const data = await auth.post("/users/register", user).then((res) => res.data)
            
            console.log(data)
        } catch (error) {
            console.error("Erro ao registrar usuário:", error)
            return false
        }
    }

    return { register }
}