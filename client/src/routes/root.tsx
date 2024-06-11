import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";
import TypingTest from "../components/typing test/typing-test.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../app/store.ts";
import "../styles/base.css";
import "../styles/theme.css";
import "../styles/header.css";

export default function Root() {
  const selectTheme = (state: RootState) => state.theme.value;
  const currentTheme = useSelector(selectTheme);

  return (
    <div className="layout" id={currentTheme}>
      <Header />
      <div className="main">
        <div className="content">
          <TypingTest />
        </div>
      </div>
      <Footer />
    </div>
  );
}
