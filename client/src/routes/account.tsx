import Header from "../components/header/header";
import AccountView from "../components/account/account-view";
import LoginView from "../components/account/login-view";
import SignupView from "../components/account/signup-view";
import Footer from "../components/footer/footer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import "../styles/base.css";
import "../styles/theme.css";
import "../styles/header.css";
import { AccountViewType } from "../constants/constants";
import { useAuth } from "../app/hooks";

export default function Account() {
  const selectTheme = (state: RootState) => state.theme.value;
  const currentTheme = useSelector(selectTheme);
  const [accountViewType, setAccountViewType] = useState(AccountViewType.Login);
  const { currentUser, login, signup, logout } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setAccountViewType(AccountViewType.Account);
    } else {
      setAccountViewType(AccountViewType.Login);
    }
  }, [currentUser]);

  return (
    <div className="layout" id={currentTheme}>
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
