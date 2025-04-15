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

export const cafe: Theme = {
  primaryColor: "#fefae0",
  secondaryColor: "#dda15e",
  backgroundColor: "#763F0E",
  primaryDark: "#283618",
  primaryLight: "#606c38",
  textColor: "#ffffff",
  untypedChar: "#636669",
  typedChar: "#ffffff",
  incorrectChar: "rgb(255, 116, 116)",
};

export const pine: Theme = {
  primaryColor: "#dad7cd",
  secondaryColor: "#a3b18a",
  backgroundColor: "#588157",
  primaryDark: "#3a5a40",
  primaryLight: "#344e41",
  textColor: "#ffffff",
  untypedChar: "#636669",
  typedChar: "#ffffff",
  incorrectChar: "rgb(255, 116, 116)",
};
