import { useEffect, useState } from "react";
import { bus } from "../../utils/bus";

function Message() {

    const [visible, setVisible] = useState(false)
    const [type, setType] = useState('')
    const [message, setMessage] = useState('')
    
    useEffect(() => {
 
        bus.addEventListener("flash", ({message, type}) => {
            setVisible(true)
            setType(type)
            setMessage(message)

            setTimeout(() => {
                setVisible(false)
            }, 3000)
        })
        
    }, [])

    return (
       visible && (
        <div className={`message ${type}`}>
            {message}
        </div>
       )
    )


}

export default Message;
