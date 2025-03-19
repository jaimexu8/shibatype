import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";
import { useTheme } from "../app/hooks.js";
import { useState, useEffect } from "react";
import api from "../services/api.js";
import { getAuth } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";

interface Theme {
  name: string;
  unlocked: boolean;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  primaryDark: string;
  primaryLight: string;
}

export default function Store() {
  const { theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>();
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    async function fetchThemes() {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("No Firebase user found.");
          return;
        }

        const userResponse = await api.get(`/api/user/${currentUser.uid}`);
        setUser(userResponse.data);

        const themesResponse = await api.get("/api/store/themes");
        const fetchedThemes = themesResponse.data.themes || themesResponse.data;
        setThemes(fetchedThemes);
      } catch (error) {
        console.error("Error fetching themes:", error);
      }
    }
    fetchThemes();
  }, []);

  return (
    <div
      className="layout"
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      <Header />
      <div className="main">
        <div className="content" style={{ padding: "16px" }}>
          <h1>Available Themes</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            {themes.map((t, index) => {
              const isUnlocked = user?.themes && user.themes.includes(t.name);
              return (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                    backgroundColor: t.backgroundColor,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h3
                    style={{
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {t.name}
                    {!isUnlocked ? (
                      <FontAwesomeIcon
                        icon={faLock}
                        style={{
                          marginLeft: "8px",
                          color: theme.secondaryColor,
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faUnlock}
                        style={{
                          marginLeft: "8px",
                          color: theme.secondaryColor,
                        }}
                      />
                    )}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      title="Primary Color"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: t.primaryColor,
                        borderRadius: "4px",
                      }}
                    />
                    <div
                      title="Secondary Color"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: t.secondaryColor,
                        borderRadius: "4px",
                      }}
                    />
                    <div
                      title="Primary Dark"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: t.primaryDark,
                        borderRadius: "4px",
                      }}
                    />
                    <div
                      title="Primary Light"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: t.primaryLight,
                        borderRadius: "4px",
                      }}
                    />
                    <div
                      title="Background Color"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: t.backgroundColor,
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
