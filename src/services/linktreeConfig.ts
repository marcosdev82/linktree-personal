import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConnection";

export type ButtonEffect = "none" | "scale" | "lift" | "glow";

export interface LinkButton {
  id: string;
  label: string;
  url: string;
  icon: string;
}

export interface LinktreeConfig {
  backgroundFrom: string;
  backgroundTo: string;
  backgroundImageUrl: string;
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
const FIRESTORE_DOC = (import.meta.env.VITE_FIRESTORE_COLLECTION as string | undefined) ?? "Settings";
const FIRESTORE_KEY =
  (import.meta.env.VITE_FIRESTORE_DOCUMENT_ID as string | undefined) ?? "r0ciGUlZFhbgSQvofxh0";

const defaultConfig: LinktreeConfig = {
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
      url: "http://marcostavares.dev.com.br",
      icon: "globe",
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
      const icon = typeof item.icon === "string" && item.icon ? item.icon : "arrow-right";

      return { id, label, url, icon };
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

function parseStoredConfig(value: unknown): LinktreeConfig {
  if (!isObject(value)) {
    return getDefaultLinktreeConfig();
  }

  return {
    backgroundFrom:
      typeof value.backgroundFrom === "string" ? value.backgroundFrom : defaultConfig.backgroundFrom,
    backgroundTo: typeof value.backgroundTo === "string" ? value.backgroundTo : defaultConfig.backgroundTo,
    backgroundImageUrl:
      typeof value.backgroundImageUrl === "string"
        ? value.backgroundImageUrl
        : defaultConfig.backgroundImageUrl,
    photoUrl: typeof value.photoUrl === "string" ? value.photoUrl : defaultConfig.photoUrl,
    name: typeof value.name === "string" ? value.name : defaultConfig.name,
    description: typeof value.description === "string" ? value.description : defaultConfig.description,
    buttonGap: typeof value.buttonGap === "number" ? value.buttonGap : defaultConfig.buttonGap,
    buttonColor: typeof value.buttonColor === "string" ? value.buttonColor : defaultConfig.buttonColor,
    buttonHoverColor:
      typeof value.buttonHoverColor === "string"
        ? value.buttonHoverColor
        : defaultConfig.buttonHoverColor,
    buttonTextColor:
      typeof value.buttonTextColor === "string"
        ? value.buttonTextColor
        : defaultConfig.buttonTextColor,
    buttonBorderRadius:
      typeof value.buttonBorderRadius === "number"
        ? value.buttonBorderRadius
        : defaultConfig.buttonBorderRadius,
    buttonBorderWidth:
      typeof value.buttonBorderWidth === "number"
        ? value.buttonBorderWidth
        : defaultConfig.buttonBorderWidth,
    buttonBorderColor:
      typeof value.buttonBorderColor === "string"
        ? value.buttonBorderColor
        : defaultConfig.buttonBorderColor,
    buttonEffect:
      value.buttonEffect === "none" ||
      value.buttonEffect === "scale" ||
      value.buttonEffect === "lift" ||
      value.buttonEffect === "glow"
        ? value.buttonEffect
        : defaultConfig.buttonEffect,
    buttons: sanitizeButtons(value.buttons),
  };
}

export function getLinktreeConfig(): LinktreeConfig {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return getDefaultLinktreeConfig();
  }

  try {
    return parseStoredConfig(JSON.parse(raw));
  } catch {
    return getDefaultLinktreeConfig();
  }
}

export async function loadLinktreeConfigFromFirebase(): Promise<LinktreeConfig> {
  try {
    const snapshot = await getDoc(doc(db, FIRESTORE_DOC, FIRESTORE_KEY));

    if (!snapshot.exists()) {
      const fallbackConfig = getLinktreeConfig();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackConfig));
      return fallbackConfig;
    }

    const config = parseStoredConfig(snapshot.data());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return config;
  } catch (error) {
    console.error("Erro ao carregar configuracao do Firebase:", error);
    return getLinktreeConfig();
  }
}

export async function saveLinktreeConfig(config: LinktreeConfig): Promise<void> {
  try {
    await setDoc(doc(db, FIRESTORE_DOC, FIRESTORE_KEY), config);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    const target = `${FIRESTORE_DOC}/${FIRESTORE_KEY}`;
    const detailedMessage = `Falha ao salvar no Firebase (${target}): ${message}`;
    console.error(detailedMessage, error);
    throw new Error(detailedMessage);
  }
}