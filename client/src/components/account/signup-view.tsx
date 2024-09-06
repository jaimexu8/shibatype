import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth, useTheme } from "../../app/hooks";
import { AccountViewType } from "../../constants/constants";
import { FirebaseError } from "firebase/app";

interface SignupViewProps {
  setAccountViewType: React.Dispatch<React.SetStateAction<number>>;
}

export default function SignupView({ setAccountViewType }: SignupViewProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const { theme } = useTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { user } = await signup(email, username, password);
      if (user) {
        setAccountViewType(AccountViewType.Account);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(
          "Invalid email, username, or password (Note: password must be 6 characters or more)"
        );
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="userName"
                required
                fullWidth
                id="userName"
                label="Username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  style: {
                    color: theme.textColor,
                    backgroundColor: theme.primaryDark,
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: theme.primaryLight,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  style: {
                    color: theme.textColor,
                    backgroundColor: theme.primaryDark,
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: theme.primaryLight,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: {
                    color: theme.textColor,
                    backgroundColor: theme.primaryDark,
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: theme.primaryLight,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ backgroundColor: theme.primaryDark }}
            className="account-input-button"
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="#"
                onClick={() => setAccountViewType(AccountViewType.Login)}
                style={{ color: theme.textColor, textDecoration: "none" }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Typography
          variant="body2"
          color="error"
          sx={{ margin: "20px", textAlign: "center" }}
        >
          {error}
        </Typography>
      </Box>
    </Container>
  );
}
