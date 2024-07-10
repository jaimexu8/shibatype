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
import { useDispatch } from "react-redux";
import { setUser } from "../../app/userSlice";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

interface LoginViewProps {
  setViewSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginView({ setViewSignup }: LoginViewProps) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      }
      console.log("User: ", user);
    } catch (e) {
      console.error(e);
      if (e instanceof FirebaseError) {
        setError("Invalid email or password");
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn();
  };

  const viewSignup = () => {
    setViewSignup(true);
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
            className="account-text-field"
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
            className="account-text-field"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={signIn}
            className="account-input-button"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={viewSignup}
                className="account-text"
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
