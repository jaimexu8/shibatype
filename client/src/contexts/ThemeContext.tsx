import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Theme, dark, cafe, pine } from "../styles/themes";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  firebaseID?: string;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  firebaseID,
}) => {
  const [theme, setTheme] = useState<Theme>(dark);

  useEffect(() => {
    const fetchUserTheme = async () => {
      if (!firebaseID) return;
      try {
        const response = await fetch(`/api/user/theme/${firebaseID}`);
        if (!response.ok) {
          console.error("Failed to fetch user theme");
          return;
        }
        const userTheme = await response.json();
        switch (userTheme) {
          case "dark":
            setTheme(dark);
            break;
          case "cafe":
            setTheme(cafe);
            break;
          case "pine":
            setTheme(pine);
            break;
          default:
            setTheme(dark);
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    };

    fetchUserTheme();
  }, [firebaseID]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
