import Header from "../components/header.js";
import Footer from "../components/footer.jsx";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import "../styles/base.css";
import "../styles/theme.css";
import "../styles/header.css";

export default function Leaderboard() {
  const selectTheme = (state: RootState) => state.theme.value;
  const currentTheme = useSelector(selectTheme);

  return (
    <div className="layout" id={currentTheme}>
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
