export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  untypedChar: string;
  typedChar: string;
  incorrectChar: string;
}

export const dark: Theme = {
  primaryColor: "#2B2E31",
  secondaryColor: "#2F3235",
  backgroundColor: "#333437",
  textColor: "white",
  untypedChar: "#636669",
  typedChar: "#ffffff",
  incorrectChar: "rgb(255, 116, 116)",
};

export const shiba: Theme = {
  primaryColor: "#d4a276",
  secondaryColor: "#bc8a5f",
  backgroundColor: "#e6b381",
  textColor: "white",
  untypedChar: "",
  typedChar: "black",
  incorrectChar: "rgb(255, 116, 116)",
};
