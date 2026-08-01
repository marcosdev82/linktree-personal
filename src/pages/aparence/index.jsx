import { Avatar } from "../../compents/Avatar/indext";
import { Navegation } from "../../compents/Navibar";
import { useMemo, useState } from "react";

export function Aparence() {
    const [backgroundFrom, setBackgroundFrom] = useState("#408F60");
    const [backgroundTo, setBackgroundTo] = useState("#9FE9C9");
    const [buttonColor, setButtonColor] = useState("#2b8a4a");
    const [buttonTextColor, setButtonTextColor] = useState("#ffffff");
    const [title, setTitle] = useState("@marcostv");
    const [description, setDescription] = useState("Seu texto de apresentação aqui.");

    const previewBackground = useMemo(
        () => ({
            backgroundImage: `linear-gradient(180deg, ${backgroundFrom} 0%, ${backgroundTo} 100%)`,
        }),
        [backgroundFrom, backgroundTo]
    );

    return (
        <>
            <Navegation />
            <div className="mx-auto w-full max-w-6xl px-4 py-6">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800">Perfil</h2>
                        <div className="mt-4 space-y-4">
                            <Avatar />
                        </div>
     
                        <h2 className="text-lg font-bold text-gray-800">Aparência</h2>

                    </section>

                    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800">Preview</h2>
                        <p className="mt-1 text-sm text-gray-600">Visualização em tempo real.</p>

                        <div
                            className="mt-4 rounded-2xl p-5 text-white shadow-inner"
                            style={previewBackground}
                        >
                            <div className="mx-auto max-w-sm text-center">
                                <div className="mx-auto h-16 w-16 rounded-full border-2 border-white/60 bg-white/25" />
                                <h3 className="mt-3 text-xl font-black">{title || "@usuario"}</h3>
                                <p className="mt-1 text-sm text-white/90">{description || "Descrição do perfil"}</p>

                                <button
                                    type="button"
                                    className="mt-4 w-full rounded-full px-4 py-3 font-semibold"
                                    style={{ backgroundColor: buttonColor, color: buttonTextColor }}
                                >
                                    Botão de exemplo
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}