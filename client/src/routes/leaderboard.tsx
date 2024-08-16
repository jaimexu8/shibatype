import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";
import { useTheme } from "../app/hooks.js";

export default function Leaderboard() {
  const { theme } = useTheme();

  return (
    <div
      className="layout"
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      <Header />
      <div className="main">
        <div className="content">
          <h1>Page under development</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
