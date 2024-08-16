import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Container from "@mui/material/Container";
import { FirebaseError } from "firebase/app";
import { AccountViewType } from "../../constants/constants";
import { useTheme, useAuth } from "../../app/hooks";

interface LoginViewProps {
  setAccountViewType: React.Dispatch<React.SetStateAction<AccountViewType>>;
}

export default function LoginView({ setAccountViewType }: LoginViewProps) {
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { user } = await login(email, password);
      if (user) {
        setAccountViewType(AccountViewType.Account);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error);
        setError("Invalid email or password");
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
        <Typography
          component="h1"
          variant="h4"
          sx={{ color: theme.untypedChar }}
        >
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: {
                color: theme.textColor,
                backgroundColor: theme.primaryColor,
              },
            }}
            InputLabelProps={{
              style: {
                color: theme.untypedChar,
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: {
                color: theme.textColor,
                backgroundColor: theme.primaryColor,
              },
            }}
            InputLabelProps={{
              style: {
                color: theme.untypedChar,
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
<<<<<<< HEAD
            onClick={signIn}
            style={{ backgroundColor: theme.secondaryColor }}
=======
            className="account-input-button"
>>>>>>> f44bdaa (auth)
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => setAccountViewType(AccountViewType.Signup)}
                style={{ textDecoration: "none" }}
              >
                {" "}
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="body2" color="error" sx={{ margin: "20px" }}>
          {error}
        </Typography>
      </Box>
    </Container>
  );
}
