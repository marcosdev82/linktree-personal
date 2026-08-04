import React, { useEffect, useState } from 'react';

function Message({ message, type, duration = 3000 }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        const showTimer = window.setTimeout(() => setIsVisible(true), 50);
        const hideTimer = window.setTimeout(() => {
            setIsVisible(false);
            window.setTimeout(() => setIsMounted(false), 500);
        }, duration);

        return () => {
            window.clearTimeout(showTimer);
            window.clearTimeout(hideTimer);
        };
    }, [duration, message]);

    const styles = {
        success: 'border border-green-500 bg-green-50 text-green-700',
        error: 'border border-red-500 bg-red-50 text-red-700',
        warning: 'border border-yellow-500 bg-yellow-50 text-yellow-700',
        info: 'border border-blue-500 bg-blue-50 text-blue-700',
    };

    if (!isMounted) return null;

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
        >
            <div
                role="alert"
                className={`rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${styles[type] || styles.info}`}
            >
                {message}
            </div>
        </div>
    );
}

export { Message };
export default Message;