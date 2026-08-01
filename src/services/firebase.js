const STORAGE_CONFIG_KEY = "@linktree:config";

const DEFAULT_CONFIG = {
  backgroundFrom: "#408F60",
  backgroundTo: "#9FE9C9",
  backgroundImageUrl: "",
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
      url: "https://marcostavares.dev.com.br",
      icon: "globe",
    },
  ],
};

function isObject(value) {
  return typeof value === "object" && value !== null;
}

function normalizeButtons(buttons) {
  if (!Array.isArray(buttons)) {
    return [...DEFAULT_CONFIG.buttons];
  }

  const normalized = buttons
    .map((button, index) => {
      if (!isObject(button)) {
        return null;
      }

      return {
        id: typeof button.id === "string" && button.id ? button.id : `button-${index + 1}`,
        label: typeof button.label === "string" ? button.label : "Novo botao",
        url: typeof button.url === "string" ? button.url : "https://",
        icon: typeof button.icon === "string" && button.icon ? button.icon : "arrow-right",
      };
    })
    .filter(Boolean);

  return normalized.length > 0 ? normalized : [...DEFAULT_CONFIG.buttons];
}

function normalizeLinktreeConfig(config) {
  if (!isObject(config)) {
    return { ...DEFAULT_CONFIG, buttons: [...DEFAULT_CONFIG.buttons] };
  }

  return {
    backgroundFrom:
      typeof config.backgroundFrom === "string" ? config.backgroundFrom : DEFAULT_CONFIG.backgroundFrom,
    backgroundTo: typeof config.backgroundTo === "string" ? config.backgroundTo : DEFAULT_CONFIG.backgroundTo,
    backgroundImageUrl:
      typeof config.backgroundImageUrl === "string"
        ? config.backgroundImageUrl
        : DEFAULT_CONFIG.backgroundImageUrl,
    photoUrl: typeof config.photoUrl === "string" ? config.photoUrl : DEFAULT_CONFIG.photoUrl,
    name: typeof config.name === "string" ? config.name : DEFAULT_CONFIG.name,
    description: typeof config.description === "string" ? config.description : DEFAULT_CONFIG.description,
    buttonGap: typeof config.buttonGap === "number" ? config.buttonGap : DEFAULT_CONFIG.buttonGap,
    buttonColor: typeof config.buttonColor === "string" ? config.buttonColor : DEFAULT_CONFIG.buttonColor,
    buttonHoverColor:
      typeof config.buttonHoverColor === "string" ? config.buttonHoverColor : DEFAULT_CONFIG.buttonHoverColor,
    buttonTextColor:
      typeof config.buttonTextColor === "string" ? config.buttonTextColor : DEFAULT_CONFIG.buttonTextColor,
    buttonBorderRadius:
      typeof config.buttonBorderRadius === "number"
        ? config.buttonBorderRadius
        : DEFAULT_CONFIG.buttonBorderRadius,
    buttonBorderWidth:
      typeof config.buttonBorderWidth === "number"
        ? config.buttonBorderWidth
        : DEFAULT_CONFIG.buttonBorderWidth,
    buttonBorderColor:
      typeof config.buttonBorderColor === "string"
        ? config.buttonBorderColor
        : DEFAULT_CONFIG.buttonBorderColor,
    buttonEffect:
      config.buttonEffect === "none" ||
      config.buttonEffect === "scale" ||
      config.buttonEffect === "lift" ||
      config.buttonEffect === "glow"
        ? config.buttonEffect
        : DEFAULT_CONFIG.buttonEffect,
    buttons: normalizeButtons(config.buttons),
  };
}

export function getLinktreeConfig() {
  const rawConfig = localStorage.getItem(STORAGE_CONFIG_KEY);

  if (!rawConfig) {
    return { ...DEFAULT_CONFIG, buttons: [...DEFAULT_CONFIG.buttons] };
  }

  try {
    return normalizeLinktreeConfig(JSON.parse(rawConfig));
  } catch {
    return { ...DEFAULT_CONFIG, buttons: [...DEFAULT_CONFIG.buttons] };
  }
}

// Mantido por compatibilidade com a chamada atual da Home.
export async function loadLinktreeConfigFromFirebase() {
  const config = getLinktreeConfig();
  localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config));
  return config;
}
