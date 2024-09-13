import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";
import LeaderboardTable from "../components/leaderboard/leaderboard-table.js";
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
          <LeaderboardTable />
        </div>
      </div>
      <Footer />
    </div>
  );
}
