import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";
import { useTheme, useUser } from "../app/hooks.js";
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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Skeleton from "../components/Skeleton";
import { useDelayedSkeleton } from "../hooks/useDelayedSkeleton";

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
  const { updateUserData } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loadingThemes, setLoadingThemes] = useState(true);
  const showSkeleton = useDelayedSkeleton(loadingThemes);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<
    "info" | "success" | "warning" | "error"
  >("info");

  useEffect(() => {
    async function fetchThemes() {
      try {
        setLoadingThemes(true);
        const auth = getAuth();
        const currentUser = auth.currentUser;

        const themesResponse = await api.get("/api/store/themes");
        let fetchedThemes = themesResponse.data.themes || themesResponse.data;

        if (!Array.isArray(fetchedThemes)) {
          console.error("Invalid themes response format:", themesResponse.data);
          fetchedThemes = [];
        }

        setThemes(fetchedThemes);

        if (currentUser) {
          try {
            const userResponse = await api.get(`/api/user/${currentUser.uid}`);
            setUser(userResponse.data);
            setIsLoggedIn(true);
          } catch (error) {
            console.error("Error fetching user data:", error);
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }

        setLoadingThemes(false);
      } catch (error) {
        console.error("Error fetching themes:", error);
      }
    }
    fetchThemes();
  }, []);

  const showToast = (
    message: string,
    severity: "info" | "success" | "warning" | "error" = "info"
  ) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  function handleThemeClick(selected: Theme) {
    if (!isLoggedIn) {
      showToast("Please sign in to purchase themes", "info");
      return;
    }
    setSelectedTheme(selected);
    setPurchaseDialogOpen(true);
  }

  async function handleConfirmPurchase() {
    if (!isLoggedIn) {
      showToast("Please sign in to purchase themes", "info");
      setPurchaseDialogOpen(false);
      return;
    }

    if (user && user.coins >= 100 && selectedTheme) {
      try {
        const updatedUser = {
          ...user,
          coins: user.coins - 100,
          themes: [...(user.themes || []), selectedTheme.name],
        };
        await api.put(`/api/user/unlockTheme/${user.firebaseID}`, updatedUser);
        setUser(updatedUser);
        await updateUserData(); // Refresh user data in context
        setPurchaseDialogOpen(false);
        showToast(`Successfully purchased ${selectedTheme.name}!`, "success");
      } catch (error) {
        showToast("There was an error purchasing this theme.", "error");
        console.error(error);
      }
    } else {
      showToast("Not enough coins to purchase this theme.", "warning");
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
            {loadingThemes
              ? showSkeleton ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "16px",
                      backgroundColor: theme.backgroundColor,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Skeleton height="1.5rem" width="60%" className="mb-3" />
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Skeleton width="30px" height="30px" borderRadius="4px" />
                      <Skeleton width="30px" height="30px" borderRadius="4px" />
                      <Skeleton width="30px" height="30px" borderRadius="4px" />
                      <Skeleton width="30px" height="30px" borderRadius="4px" />
                    </div>
                  </div>
                )) : null
              : themes.map((t, index) => {
              const isUnlocked =
                isLoggedIn && user?.themes && user.themes.includes(t.name);
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
        PaperProps={{
          sx: {
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            borderRadius: "12px",
            border: `2px solid ${theme.primaryColor}`,
            minWidth: "400px",
            maxWidth: "500px",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            borderBottom: `1px solid ${theme.primaryColor}`,
            padding: "24px 24px 16px 24px",
            fontSize: "24px",
            fontWeight: "600",
            color: theme.primaryColor,
          }}
        >
          Purchase Theme
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "24px",
            textAlign: "center",
          }}
        >
          {selectedTheme && (
            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "20px",
                  fontWeight: "500",
                  color: theme.textColor,
                }}
              >
                {selectedTheme.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <div
                  title="Primary Color"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: selectedTheme.primaryColor,
                    borderRadius: "8px",
                    border: `2px solid ${theme.primaryColor}`,
                  }}
                />
                <div
                  title="Secondary Color"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: selectedTheme.secondaryColor,
                    borderRadius: "8px",
                    border: `2px solid ${theme.primaryColor}`,
                  }}
                />
                <div
                  title="Primary Dark"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: selectedTheme.primaryDark,
                    borderRadius: "8px",
                    border: `2px solid ${theme.primaryColor}`,
                  }}
                />
                <div
                  title="Primary Light"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: selectedTheme.primaryLight,
                    borderRadius: "8px",
                    border: `2px solid ${theme.primaryColor}`,
                  }}
                />
              </div>
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontSize: "18px",
              fontWeight: "500",
              color: theme.textColor,
              marginBottom: "8px",
            }}
          >
            <span>Price:</span>
            <span style={{ color: theme.primaryColor }}>100</span>
            <FontAwesomeIcon
              icon={faCoins}
              style={{
                color: theme.secondaryColor,
                fontSize: "20px",
              }}
            />
          </div>
          <p
            style={{
              margin: "0",
              fontSize: "16px",
              color: theme.textColor,
              opacity: 0.8,
            }}
          >
            Do you want to purchase this theme?
          </p>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "16px 24px 24px 24px",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => setPurchaseDialogOpen(false)}
            variant="outlined"
            sx={{
              borderColor: theme.primaryColor,
              color: theme.primaryColor,
              "&:hover": {
                borderColor: theme.primaryDark,
                backgroundColor: theme.primaryLight,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPurchase}
            variant="contained"
            sx={{
              backgroundColor: theme.primaryColor,
              color: theme.backgroundColor,
              "&:hover": {
                backgroundColor: theme.primaryDark,
              },
            }}
          >
            Purchase
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toastSeverity}
          sx={{
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            border: `1px solid ${theme.primaryColor}`,
            "& .MuiAlert-icon": {
              color: theme.primaryColor,
            },
            "& .MuiAlert-message": {
              color: theme.textColor,
            },
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
