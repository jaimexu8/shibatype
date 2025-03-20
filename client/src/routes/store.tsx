import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";
import { useTheme } from "../app/hooks.js";
import { useState, useEffect } from "react";
import api from "../services/api.js";
import { getAuth } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock, faCoins } from "@fortawesome/free-solid-svg-icons";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

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
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

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

  function handleThemeClick(selected: Theme) {
    setSelectedTheme(selected);
    setPurchaseDialogOpen(true);
  }

  async function handleConfirmPurchase() {
    if (user && user.coins >= 100 && selectedTheme) {
      try {
        const updatedUser = {
          ...user,
          coins: user.coins - 100,
          themes: [...(user.themes || []), selectedTheme.name],
        };
        await api.put(`/api/user/unlockTheme/${user.firebaseID}`, updatedUser);
        setUser(updatedUser);
        setPurchaseDialogOpen(false);
      } catch (error) {
        alert("There was an error purchasing this theme.");
        console.error(error);
      }
    } else {
      alert("Not enough coins to purchase this theme.");
      setPurchaseDialogOpen(false);
    }
  }

  return (
    <div
      className="layout"
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      <Header />
      <div className="main">
        <div className="content" style={{ padding: "16px" }}>
          <h1>Themes</h1>
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
                  onClick={!isUnlocked ? () => handleThemeClick(t) : undefined}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                    backgroundColor: t.backgroundColor,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    cursor: !isUnlocked ? "pointer" : "default",
                  }}
                >
                  {!isUnlocked && (
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: t.primaryDark,
                        padding: "4px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      100{" "}
                      <FontAwesomeIcon
                        icon={faCoins}
                        style={{
                          marginLeft: "4px",
                          color: theme.secondaryColor,
                        }}
                      />
                    </div>
                  )}
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />

      <Dialog
        open={purchaseDialogOpen}
        onClose={() => setPurchaseDialogOpen(false)}
      >
        <DialogTitle>Purchase Theme</DialogTitle>
        <DialogContent>
          <p>Do you want to purchase {selectedTheme?.name} for 100 coins?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPurchaseDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmPurchase}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
