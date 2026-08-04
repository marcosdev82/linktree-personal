import React, { useEffect, useState } from "react";
import bus from "../../utils/bus";

function Message() {

    const [visible, setVisible] = useState(false)
    const [type, setType] = useState('')
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        const handleFlash = ({ message, type }) => {
            setVisible(true)
            setType(type)
            setMessage(message)

            setTimeout(() => {
                setVisible(false)
            }, 3000)
        }

        bus.addEventListener("flash", handleFlash)

        return () => {
            bus.removeEventListener("flash", handleFlash)
        }
        
    }, [])

    if (!visible) {
        return null
    }

    return React.createElement(
        "div",
        { className: `message ${type}` },
        message
    )


}

export default Message;
