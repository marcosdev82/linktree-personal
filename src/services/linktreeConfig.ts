export type ButtonEffect = "none" | "scale" | "lift" | "glow";

export interface LinkButton {
  id: string;
  label: string;
  url: string;
}

export interface LinktreeConfig {
  backgroundFrom: string;
  backgroundTo: string;
  photoUrl: string;
  name: string;
  description: string;
  buttonGap: number;
  buttonColor: string;
  buttonHoverColor: string;
  buttonTextColor: string;
  buttonBorderRadius: number;
  buttonBorderWidth: number;
  buttonBorderColor: string;
  buttonEffect: ButtonEffect;
  buttons: LinkButton[];
}

const STORAGE_KEY = "@linktree:config";

const defaultConfig: LinktreeConfig = {
  backgroundFrom: "#408F60",
  backgroundTo: "#9FE9C9",
  photoUrl: "https://avatars.githubusercontent.com/u/10318700?v=4",
  name: "@marcostv",
  description: "Veja meus trabalhos e descubra como posso ajudar voce.",
  buttonGap: 16,
  buttonColor: "#2b8a4a",
  buttonHoverColor: "#226f3b",
  buttonTextColor: "#ffffff",
  buttonBorderRadius: 999,
  buttonBorderWidth: 0,
  buttonBorderColor: "#2b8a4a",
  buttonEffect: "scale",
  buttons: [
    {
      id: "button-1",
      label: "Website",
      url: "http://marcostavares.dev.com.br",
    },
  ],
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function sanitizeButtons(value: unknown): LinkButton[] {
  if (!Array.isArray(value)) {
    return defaultConfig.buttons;
  }

  const result = value
    .map((item, index) => {
      if (!isObject(item)) {
        return null;
      }

      const id = typeof item.id === "string" && item.id ? item.id : `button-${index + 1}`;
      const label = typeof item.label === "string" ? item.label : "Novo botao";
      const url = typeof item.url === "string" ? item.url : "https://";

      return { id, label, url };
    })
    .filter((item): item is LinkButton => item !== null);

  return result.length > 0 ? result : defaultConfig.buttons;
}

export function getDefaultLinktreeConfig(): LinktreeConfig {
  return {
    ...defaultConfig,
    buttons: [...defaultConfig.buttons],
  };
}

export function getLinktreeConfig(): LinktreeConfig {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return getDefaultLinktreeConfig();
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isObject(parsed)) {
      return getDefaultLinktreeConfig();
    }

    return {
      backgroundFrom:
        typeof parsed.backgroundFrom === "string" ? parsed.backgroundFrom : defaultConfig.backgroundFrom,
      backgroundTo: typeof parsed.backgroundTo === "string" ? parsed.backgroundTo : defaultConfig.backgroundTo,
      photoUrl: typeof parsed.photoUrl === "string" ? parsed.photoUrl : defaultConfig.photoUrl,
      name: typeof parsed.name === "string" ? parsed.name : defaultConfig.name,
      description: typeof parsed.description === "string" ? parsed.description : defaultConfig.description,
      buttonGap:
        typeof parsed.buttonGap === "number" ? parsed.buttonGap : defaultConfig.buttonGap,
      buttonColor: typeof parsed.buttonColor === "string" ? parsed.buttonColor : defaultConfig.buttonColor,
      buttonHoverColor:
        typeof parsed.buttonHoverColor === "string"
          ? parsed.buttonHoverColor
          : defaultConfig.buttonHoverColor,
      buttonTextColor:
        typeof parsed.buttonTextColor === "string"
          ? parsed.buttonTextColor
          : defaultConfig.buttonTextColor,
      buttonBorderRadius:
        typeof parsed.buttonBorderRadius === "number"
          ? parsed.buttonBorderRadius
          : defaultConfig.buttonBorderRadius,
      buttonBorderWidth:
        typeof parsed.buttonBorderWidth === "number"
          ? parsed.buttonBorderWidth
          : defaultConfig.buttonBorderWidth,
      buttonBorderColor:
        typeof parsed.buttonBorderColor === "string"
          ? parsed.buttonBorderColor
          : defaultConfig.buttonBorderColor,
      buttonEffect:
        parsed.buttonEffect === "none" ||
        parsed.buttonEffect === "scale" ||
        parsed.buttonEffect === "lift" ||
        parsed.buttonEffect === "glow"
          ? parsed.buttonEffect
          : defaultConfig.buttonEffect,
      buttons: sanitizeButtons(parsed.buttons),
    };
  } catch {
    return getDefaultLinktreeConfig();
  }
}

export function saveLinktreeConfig(config: LinktreeConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}