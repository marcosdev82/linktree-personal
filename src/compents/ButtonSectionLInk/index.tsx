import { type ReactNode } from 'react'

interface ButtonLinkProps{
    url: string;
    children: ReactNode;
}

export default function ButtonSectionLink({url, children}: ButtonLinkProps) {
   return  (
    <section className="w-full">
        <a  
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            className="flex w-full items-center justify-between gap-2 text-center bg-[oklch(0.56_0.17_149.56)] text-white py-2 px-4 rounded-full hover:opacity-90 transition-all select-none hover:scale-105"
            >
            {children} 
        </a>
    </section>
   )
}