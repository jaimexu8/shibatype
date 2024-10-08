import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Root from "./routes/root";
import Leaderboard from "./routes/leaderboard";
import Store from "./routes/store";
import Account from "./routes/account";
import ErrorPage from "./error-page";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/store",
    element: <Store />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/account",
    element: <Account />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </AuthProvider>
);
