import { FaGithub, FaInstagram, FaLinkedin, FaShareNodes, FaWhatsapp, FaArrowRight } from "react-icons/fa6";
import { Social } from "../../compents/Social";
import { useMemo, useState, type CSSProperties } from "react";
import { getLinktreeConfig, type ButtonEffect } from "../../services/linktreeConfig";

function getButtonEffectStyle(effect: ButtonEffect, isHovered: boolean): CSSProperties {
    if (!isHovered) {
        return {
            transform: "translateY(0)",
            boxShadow: "0 6px 14px rgba(0, 0, 0, 0.08)",
        };
    }

    switch (effect) {
        case "none":
            return {
                transform: "translateY(0)",
                boxShadow: "0 6px 14px rgba(0, 0, 0, 0.08)",
            };
        case "scale":
            return {
                transform: "scale(1.03)",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.14)",
            };
        case "lift":
            return {
                transform: "translateY(-4px)",
                boxShadow: "0 14px 24px rgba(0, 0, 0, 0.18)",
            };
        case "glow":
            return {
                transform: "translateY(-1px)",
                boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.28), 0 12px 26px rgba(0, 0, 0, 0.2)",
            };
        default:
            return {
                transform: "translateY(0)",
                boxShadow: "0 6px 14px rgba(0, 0, 0, 0.08)",
            };
    }
}

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
    const [hoveredButtonId, setHoveredButtonId] = useState<string | null>(null);
    const config = useMemo(() => getLinktreeConfig(), []);
    const pageBackground = useMemo(
        () => `linear-gradient(180deg, ${config.backgroundFrom} 0%, ${config.backgroundTo} 100%)`,
        [config.backgroundFrom, config.backgroundTo]
    );

    return (
        <div className="relative flex flex-col w-full items-center justify-center min-h-screen p-2" style={{ background: pageBackground }}>
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
                <div className="z-10 rounded-full bg-linear-to-br from-[oklch(0.95_0.06_140)] via-[oklch(0.8_0.18_155)] to-[oklch(0.62_0.2_170)] p-1.25 shadow-lg shadow-black/10">
                    <div className="avatar h-32 w-32 overflow-hidden rounded-full bg-white p-1">
                        <img className="h-full w-full rounded-full object-cover" src={config.photoUrl} alt="Avatar" />
                    </div>
                </div>
                <h1 className="md:text-4xl text-3xl font-black">{config.name}</h1>
                <p className="text-lg text-gray-900 text-center">{config.description}</p>
            </div>

            <main className="mt-8 flex w-full max-w-md flex-col items-center justify-center" style={{ gap: `${config.buttonGap}px` }}>
                {config.buttons.map((button) => {
                    const isHovered = hoveredButtonId === button.id;
                    return (
                        <section className="w-full" key={button.id}>
                            <a
                                href={button.url}
                                rel="noopener noreferrer"
                                target="_blank"
                                onMouseEnter={() => setHoveredButtonId(button.id)}
                                onMouseLeave={() => setHoveredButtonId(null)}
                                className="flex w-full items-center justify-between gap-2 px-4 py-2 text-center transition-all duration-200 select-none"
                                style={{
                                    backgroundColor: isHovered ? config.buttonHoverColor : config.buttonColor,
                                    color: config.buttonTextColor,
                                    borderRadius: `${config.buttonBorderRadius}px`,
                                    border: `${config.buttonBorderWidth}px solid ${config.buttonBorderColor}`,
                                    ...getButtonEffectStyle(config.buttonEffect, isHovered),
                                }}
                            >
                                <span>{button.label}</span>
                                <FaArrowRight aria-hidden="true" />
                            </a>
                        </section>
                    );
                })}
    

                <footer className="mt-3 flex w-full justify-center flex-row gap-4">
                    <Social url="https://github.com/marcosdev82"><FaGithub aria-hidden="true" /></Social>
                    <Social url="https://github.com/marcostv"><FaInstagram aria-hidden="true" /></Social>
                    <Social url="https://github.com/marcostv"><FaWhatsapp aria-hidden="true" /></Social>
                    <Social url="https://www.linkedin.com/in/marcostv"><FaLinkedin aria-hidden="true" /></Social>
                </footer>

            </main>

        </div>
    )
}