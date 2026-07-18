import { FaGithub, FaInstagram, FaLinkedin, FaShareNodes, FaWhatsapp, FaArrowRight } from "react-icons/fa6";
import Social from "../../compents/Social";

async function handleShare() {
    const shareUrl = window.location.href;

    if (navigator.share) {
        await navigator.share({
            title: "Marcos Tavares - Meus links",
            url: shareUrl,
        });
        return;
    }

    await navigator.clipboard.writeText(shareUrl);
}

export function Home() {    
    return (
        <div className="relative flex flex-col w-full items-center justify-center h-screen p-2">
            <button
                type="button"
                onClick={handleShare}
                className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[oklch(0.93_0.03_149.56)] text-[oklch(0.34_0.04_149.56)] shadow-sm shadow-black/5 transition-all hover:scale-105 hover:bg-[oklch(0.95_0.03_149.56)]"
                aria-label="Compartilhar página"
            >
                <FaShareNodes aria-hidden="true" />
            </button>
            {/* <div className="w-full bg-gray-300 absolute h-1/3 top-0"></div> */}
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="z-10 rounded-full bg-gradient-to-br from-[oklch(0.95_0.06_140)] via-[oklch(0.8_0.18_155)] to-[oklch(0.62_0.2_170)] p-[5px] shadow-lg shadow-black/10">
                    <div className="avatar h-32 w-32 overflow-hidden rounded-full bg-white p-1">
                        <img className="h-full w-full rounded-full object-cover" src="https://avatars.githubusercontent.com/u/10318700?v=4" alt="Avatar" />
                    </div>
                </div>
                <h1 className="md:text-4xl text-3xl font-black">@marcostv</h1>
                <p className="text-lg text-gray-900 text-center">Veja meus trabalhos e descubra como posso ajudar você. 🚀​</p>
            </div>

            <main className="mt-8 flex w-full max-w-md flex-col items-center justify-center gap-4">
                <section className="w-full">
                    <a href="https://marcostv.com" className="flex w-full items-center justify-between gap-2 text-center bg-[oklch(0.56_0.17_149.56)] text-white py-2 px-4 rounded-full hover:opacity-90 transition-all select-none hover:scale-105">
                        <span>Website</span>
                        <FaArrowRight    aria-hidden="true" />
                    </a>
                </section>

                <section className="w-full">
                    <a href="https://github.com/marcostv" className="flex w-full items-center justify-between gap-2 text-center bg-[oklch(0.56_0.17_149.56)] text-white py-2 px-4 rounded-full hover:opacity-90 transition-all select-none hover:scale-105">
                        <span>Projeto Recente</span>
                        <FaArrowRight    aria-hidden="true" />
                    </a>
                </section>
 
                <section className="w-full">
                    <a href="https://www.linkedin.com/in/marcostv" className="flex w-full items-center justify-between gap-2 text-center bg-[oklch(0.56_0.17_149.56)] text-white py-2 px-4 rounded-full hover:opacity-90 transition-all select-none hover:scale-105">
                        <span>Portfolio</span>
                        <FaArrowRight    aria-hidden="true" />
                    </a>
                </section>

                <footer className="mt-3 flex w-full justify-center flex-row gap-4">

                    <Social url="https://github.com/marcostv"><FaGithub aria-hidden="true" /></Social>
                    <Social url="https://github.com/marcostv"><FaInstagram aria-hidden="true" /></Social>
                    <Social url="https://github.com/marcostv"><FaWhatsapp aria-hidden="true" /></Social>
                    <Social url="https://www.linkedin.com/in/marcostv"><FaLinkedin aria-hidden="true" /></Social>
          
                </footer>

            </main>

        </div>
    )
}