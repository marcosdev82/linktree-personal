import { Header } from "../../compents/Header";
import { useMemo, useState } from "react";
import {
    getDefaultLinktreeConfig,
    getLinktreeConfig,
    saveLinktreeConfig,
    type ButtonEffect,
    type LinktreeConfig
} from "../../services/linktreeConfig";

function shuffleButtons(config: LinktreeConfig): LinktreeConfig {
    const list = [...config.buttons];
    for (let index = list.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [list[index], list[randomIndex]] = [list[randomIndex], list[index]];
    }

    return {
        ...config,
        buttons: list,
    };
}

const effects: Array<{ value: ButtonEffect; label: string }> = [
    { value: "none", label: "Nenhum" },
    { value: "scale", label: "Scale" },
    { value: "lift", label: "Lift" },
    { value: "glow", label: "Glow" },
];

export function Admin() {
    const [config, setConfig] = useState<LinktreeConfig>(() => getLinktreeConfig());
    const [savedMessage, setSavedMessage] = useState("");

    const previewBackground = useMemo(
        () => `linear-gradient(180deg, ${config.backgroundFrom} 0%, ${config.backgroundTo} 100%)`,
        [config.backgroundFrom, config.backgroundTo]
    );

    function updateField<K extends keyof LinktreeConfig>(field: K, value: LinktreeConfig[K]) {
        setConfig((previous) => ({ ...previous, [field]: value }));
    }

    function addButton() {
        setConfig((previous) => ({
            ...previous,
            buttons: [
                ...previous.buttons,
                {
                    id: `button-${Date.now()}`,
                    label: "Novo botao",
                    url: "https://",
                },
            ],
        }));
    }

    function removeButton(id: string) {
        setConfig((previous) => {
            if (previous.buttons.length <= 1) {
                return previous;
            }

            return {
                ...previous,
                buttons: previous.buttons.filter((button) => button.id !== id),
            };
        });
    }

    function updateButton(id: string, field: "label" | "url", value: string) {
        setConfig((previous) => ({
            ...previous,
            buttons: previous.buttons.map((button) =>
                button.id === id ? { ...button, [field]: value } : button
            ),
        }));
    }

    function handleSave() {
        saveLinktreeConfig(config);
        setSavedMessage("Configuracoes salvas com sucesso.");
        window.setTimeout(() => {
            setSavedMessage("");
        }, 3000);
    }

    function handleReset() {
        setConfig(getDefaultLinktreeConfig());
        setSavedMessage("Painel resetado para o padrao.");
        window.setTimeout(() => {
            setSavedMessage("");
        }, 3000);
    }

    return (
        <div className="flex w-full min-h-screen items-center flex-col pb-7 px-2">
            <Header />

            <section className="w-full max-w-2xl mt-6 rounded-xl border border-green-100 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
                <h2 className="text-xl font-black text-gray-800">Painel de Controle do Linktree</h2>
                <p className="mt-1 text-sm text-gray-600">Altere conteudo e visual dos botoes.</p>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-1 text-sm text-gray-700">
                        Cor inicial do background
                        <input
                            type="color"
                            value={config.backgroundFrom}
                            onChange={(event) => updateField("backgroundFrom", event.target.value)}
                            className="h-10 w-full cursor-pointer rounded border border-gray-300 bg-white"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-700">
                        Cor final do background
                        <input
                            type="color"
                            value={config.backgroundTo}
                            onChange={(event) => updateField("backgroundTo", event.target.value)}
                            className="h-10 w-full cursor-pointer rounded border border-gray-300 bg-white"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-700 md:col-span-2">
                        URL da foto
                        <input
                            type="text"
                            value={config.photoUrl}
                            onChange={(event) => updateField("photoUrl", event.target.value)}
                            className="h-10 w-full rounded border border-gray-300 px-3"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-700">
                        Nome
                        <input
                            type="text"
                            value={config.name}
                            onChange={(event) => updateField("name", event.target.value)}
                            className="h-10 w-full rounded border border-gray-300 px-3"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-700">
                        Espaco entre botoes
                        <input
                            type="number"
                            min={0}
                            max={60}
                            value={config.buttonGap}
                            onChange={(event) => updateField("buttonGap", Number(event.target.value))}
                            className="h-10 w-full rounded border border-gray-300 px-3"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-700 md:col-span-2">
                        Descricao
                        <textarea
                            value={config.description}
                            onChange={(event) => updateField("description", event.target.value)}
                            className="min-h-24 w-full rounded border border-gray-300 px-3 py-2"
                        />
                    </label>
                </div>

                <h3 className="mt-6 text-lg font-bold text-gray-800">Estilo do botao</h3>
                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-1 text-sm text-gray-700">
                        Cor do botao
                        <input
                            type="color"
                            value={config.buttonColor}
                            onChange={(event) => updateField("buttonColor", event.target.value)}
                            className="h-10 w-full cursor-pointer rounded border border-gray-300 bg-white"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-700">
                        Cor no hover
                        <input
                            type="color"
                            value={config.buttonHoverColor}
                            onChange={(event) => updateField("buttonHoverColor", event.target.value)}
                            className="h-10 w-full cursor-pointer rounded border border-gray-300 bg-white"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-700">
                        Cor do texto
                        <input
                            type="color"
                            value={config.buttonTextColor}
                            onChange={(event) => updateField("buttonTextColor", event.target.value)}
                            className="h-10 w-full cursor-pointer rounded border border-gray-300 bg-white"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-700">
                        Efeito do botao
                        <select
                            value={config.buttonEffect}
                            onChange={(event) => updateField("buttonEffect", event.target.value as ButtonEffect)}
                            className="h-10 w-full rounded border border-gray-300 px-3"
                        >
                            {effects.map((effect) => (
                                <option key={effect.value} value={effect.value}>
                                    {effect.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-700">
                        Borda do botao (px)
                        <input
                            type="number"
                            min={0}
                            max={12}
                            value={config.buttonBorderWidth}
                            onChange={(event) => updateField("buttonBorderWidth", Number(event.target.value))}
                            className="h-10 w-full rounded border border-gray-300 px-3"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-700">
                        Arredondamento da borda
                        <input
                            type="number"
                            min={0}
                            max={999}
                            value={config.buttonBorderRadius}
                            onChange={(event) => updateField("buttonBorderRadius", Number(event.target.value))}
                            className="h-10 w-full rounded border border-gray-300 px-3"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-700 md:col-span-2">
                        Cor da borda
                        <input
                            type="color"
                            value={config.buttonBorderColor}
                            onChange={(event) => updateField("buttonBorderColor", event.target.value)}
                            className="h-10 w-full cursor-pointer rounded border border-gray-300 bg-white"
                        />
                    </label>
                </div>

                <h3 className="mt-6 text-lg font-bold text-gray-800">Botoes do Linktree</h3>
                <div className="mt-3 space-y-3">
                    {config.buttons.map((button, index) => (
                        <div key={button.id} className="rounded-lg border border-gray-200 p-3">
                            <div className="flex items-center justify-between">
                                <strong className="text-sm text-gray-700">Botao {index + 1}</strong>
                                <button
                                    type="button"
                                    onClick={() => removeButton(button.id)}
                                    className="text-xs font-semibold text-red-600 disabled:opacity-40"
                                    disabled={config.buttons.length <= 1}
                                >
                                    Remover
                                </button>
                            </div>

                            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                                <input
                                    type="text"
                                    value={button.label}
                                    onChange={(event) => updateButton(button.id, "label", event.target.value)}
                                    className="h-10 w-full rounded border border-gray-300 px-3"
                                    placeholder="Texto do botao"
                                />

                                <input
                                    type="text"
                                    value={button.url}
                                    onChange={(event) => updateButton(button.id, "url", event.target.value)}
                                    className="h-10 w-full rounded border border-gray-300 px-3"
                                    placeholder="https://"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={addButton}
                        className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                    >
                        Adicionar botao
                    </button>

                    <button
                        type="button"
                        onClick={() => setConfig((previous) => shuffleButtons(previous))}
                        className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                    >
                        Sortear botoes
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                    >
                        Salvar alteracoes
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Restaurar padrao
                    </button>
                </div>

                {savedMessage && <p className="mt-3 text-sm font-medium text-green-700">{savedMessage}</p>}

                <div
                    className="mt-6 rounded-xl border border-gray-200 p-4"
                    style={{ background: previewBackground }}
                >
                    <p className="text-sm font-semibold text-white/90">Preview do background</p>
                    <div className="mt-2 h-16 rounded-lg bg-white/20" />
                </div>
            </section>
        </div>
    )
}