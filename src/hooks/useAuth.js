import auth from "../services/auth"

import { useEffect, useState } from "react"
import { useFlashMessage } from "./useFlashMessage"

export default function useAuth() {

    const { setFlashMessage } = useFlashMessage()

    async function register(user) {

        let msgText = "Cadastro realizado com sucesso!"
        let msgType = "success"

        try {
            const data = await auth.post("/users/register", user).then((res) => res.data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = "error"
        }

         setFlashMessage(msgText, msgType)
    }

    return { setFlashMessage, register }
}