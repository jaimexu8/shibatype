import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";
import TypingTest from "../components/typing test/index.tsx";
import { useTheme } from "../app/hooks.ts";

export default function Root() {
  const { theme } = useTheme();

  return (
    <div
      className="layout"
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
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
