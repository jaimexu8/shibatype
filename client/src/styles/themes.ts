export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  primaryDark: string;
  primaryLight: string;
  textColor: string;
  untypedChar: string;
  typedChar: string;
  incorrectChar: string;
}

export const dark: Theme = {
  primaryColor: "#636669",
  secondaryColor: "#D6985C",
  backgroundColor: "#333437",
  primaryDark: "#2B2E31",
  primaryLight: "#636669",
  textColor: "#ffffff",
  untypedChar: "#636669",
  typedChar: "#ffffff",
  incorrectChar: "rgb(255, 116, 116)",
};
