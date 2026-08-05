import auth from "../services/auth"

import { useEffect, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import useFlashMessage from "./useFlashMessage"

export default function useAuth() {

    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user) {

        let msgText = "Cadastro realizado com sucesso!"
        let msgType = "success"

        try {
            const data = await auth.post("/users/register", user).then((res) => res.data)

            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = "error"
        }

         setFlashMessage(msgText, msgType)
    }

    async function authUser(data){

        setAuthenticated(true)

        localStorage.setItem("token", JSON.stringify(data.token))

        history.push("/")

    }

    return { setFlashMessage, register, authenticated }
}