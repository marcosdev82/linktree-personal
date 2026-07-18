import { type ReactNode } from 'react'

interface SocialProps {
    url: string;
    children: ReactNode;
}

export default function Social({ url, children }: SocialProps) {
    return (
        <a  
            href={url}
            className="flex items-center justify-center gap-2 text-center border border-[oklch(0.56_0.17_149.56)] text-[oklch(0.56_0.17_149.56)] w-9 h-9 rounded-full hover:opacity-90 transition-all select-none hover:scale-105"
            >
            {children} 
        </a>
    )
}