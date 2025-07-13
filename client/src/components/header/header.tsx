import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTrophy,
  faStore,
  faUser,
  faPalette,
  faTimes,
  faLock,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme, useAuth, useUser } from "../../app/hooks";
import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { auth } from "../../config/firebase";
import { dark, cafe, pine } from "../../styles/themes";
import "./header.css";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { currentUser } = useAuth();
  const { userData } = useUser();
  const [open, setOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(theme.name);
  const [userThemes, setUserThemes] = useState<string[]>([]);
  const [recentlyClosed, setRecentlyClosed] = useState(false);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpen = () => {
    if (!recentlyClosed) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setRecentlyClosed(true);
    if (themeButtonRef.current) {
      themeButtonRef.current.blur();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setRecentlyClosed(false);
    }, 300);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === " " && (recentlyClosed || !open)) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    if (userData) {
      setUserThemes(userData.themes || ["dark"]);
    } else if (!currentUser) {
      setUserThemes(["dark"]);
    }
  }, [userData, currentUser]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleThemeSelect = () => {
    if (!userThemes.includes(selectedTheme)) {
      return;
    }

    switch (selectedTheme) {
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

    const user = auth.currentUser;
    if (user) {
      fetch(`/api/user/selectTheme/${user.uid}/${selectedTheme}`, {
        method: "POST",
      }).catch((err) => console.error("Failed to save theme:", err));
    }

    handleClose();
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--text-color", theme.textColor);
  }, [theme]);

  const themeOptions = [
    { value: "dark", name: "Dark", color: dark.backgroundColor },
    { value: "cafe", name: "Cafe", color: cafe.backgroundColor },
    { value: "pine", name: "Pine", color: pine.backgroundColor },
  ];

  return (
    <header className="header">
      <div className="nav-container">
        <div className="nav-section">
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} width={"100px"}></img>
            <h2 className="logo-text">shibatype</h2>
          </Link>
          <Link className="nav-icon" to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link className="nav-icon" to="/leaderboard">
            <FontAwesomeIcon icon={faTrophy} />
          </Link>
          <Link className="nav-icon" to="/store">
            <FontAwesomeIcon icon={faStore} />
          </Link>
        </div>
        <div className="nav-section">
          <IconButton
            ref={themeButtonRef}
            onClick={handleOpen}
            onKeyDown={handleKeyDown}
            sx={{
              color: "var(--text-color)",
              paddingLeft: "25px",
              paddingRight: "25px",
            }}
          >
            <FontAwesomeIcon icon={faPalette} />
          </IconButton>
          {currentUser && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                paddingLeft: "15px",
                paddingRight: "15px",
                color: "var(--text-color)",
              }}
            >
              <FontAwesomeIcon icon={faCoins} style={{ fontSize: "16px" }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: "var(--text-color)",
                }}
              >
                {userData?.coins || 0}
              </Typography>
            </Box>
          )}
          <Link className="nav-icon" to="/account">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            borderRadius: "16px",
            border: `2px solid ${theme.primaryColor}`,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.textColor,
              "&:hover": {
                backgroundColor: theme.primaryColor + "20",
              },
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>

          <DialogTitle
            sx={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: theme.textColor,
              pb: 1,
            }}
          >
            Choose Your Theme
          </DialogTitle>

          <DialogContent sx={{ pt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {themeOptions.map((option) => {
                const isUnlocked = userThemes.includes(option.value);
                return (
                  <Paper
                    key={option.value}
                    onClick={
                      isUnlocked
                        ? () => setSelectedTheme(option.value)
                        : undefined
                    }
                    sx={{
                      p: 2,
                      cursor: isUnlocked ? "pointer" : "not-allowed",
                      border:
                        selectedTheme === option.value
                          ? `3px solid ${theme.secondaryColor}`
                          : `2px solid ${theme.primaryColor}`,
                      backgroundColor:
                        selectedTheme === option.value
                          ? theme.primaryColor + "20"
                          : isUnlocked
                          ? "transparent"
                          : theme.primaryColor + "10",
                      transition: "all 0.2s ease",
                      opacity: isUnlocked ? 1 : 0.6,
                      "&:hover": isUnlocked
                        ? {
                            backgroundColor: theme.primaryColor + "10",
                            transform: "translateY(-2px)",
                          }
                        : {},
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "8px",
                          backgroundColor: option.color,
                          border: `2px solid ${theme.primaryColor}`,
                          position: "relative",
                        }}
                      >
                        {!isUnlocked && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              color: theme.textColor,
                              fontSize: "16px",
                            }}
                          >
                            <FontAwesomeIcon icon={faLock} />
                          </Box>
                        )}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: theme.textColor,
                            fontWeight:
                              selectedTheme === option.value
                                ? "bold"
                                : "normal",
                          }}
                        >
                          {option.name}
                        </Typography>
                        {!isUnlocked && (
                          <FontAwesomeIcon
                            icon={faLock}
                            style={{
                              color: theme.secondaryColor,
                              fontSize: "14px",
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              onClick={handleClose}
              sx={{
                color: theme.textColor,
                borderColor: theme.primaryColor,
                "&:hover": {
                  borderColor: theme.secondaryColor,
                  backgroundColor: theme.primaryColor + "20",
                },
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleThemeSelect}
              disabled={!userThemes.includes(selectedTheme)}
              sx={{
                backgroundColor: userThemes.includes(selectedTheme)
                  ? theme.secondaryColor
                  : theme.primaryColor + "40",
                color: theme.backgroundColor,
                "&:hover": userThemes.includes(selectedTheme)
                  ? {
                      backgroundColor: theme.secondaryColor + "DD",
                    }
                  : {},
                "&:disabled": {
                  backgroundColor: theme.primaryColor + "40",
                  color: theme.textColor + "60",
                },
              }}
              variant="contained"
            >
              Apply Theme
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </header>
  );
}
