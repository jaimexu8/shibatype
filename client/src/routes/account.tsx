import Header from "../components/header/header";
import AccountView from "../components/account/account-view";
import LoginView from "../components/account/login-view";
import SignupView from "../components/account/signup-view";
import Footer from "../components/footer/footer";
import { useEffect, useState } from "react";
import { AccountViewType } from "../constants/constants";
import { useAuth, useTheme } from "../app/hooks";

export default function Account() {
  const [accountViewType, setAccountViewType] = useState(AccountViewType.Login);
  const { theme } = useTheme();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setAccountViewType(AccountViewType.Account);
    } else {
      setAccountViewType(AccountViewType.Login);
    }
  }, [currentUser]);

  return (
    <div
      className="layout"
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      <Header />
      <div className="main">
        <div className="content">
          {accountViewType === AccountViewType.Account ? (
            <AccountView setAccountViewType={setAccountViewType} />
          ) : accountViewType === AccountViewType.Login ? (
            <LoginView setAccountViewType={setAccountViewType} />
          ) : (
            <SignupView setAccountViewType={setAccountViewType} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
