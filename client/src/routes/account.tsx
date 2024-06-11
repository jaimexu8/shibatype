import Header from "../components/header/header";
import AccountView from "../components/account/account-view";
import LoginView from "../components/account/login-view";
import SignupView from "../components/account/signup-view";
import Footer from "../components/footer/footer";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { auth } from "../config/firebase";
import { setUser } from "../app/userSlice";
import "../styles/base.css";
import "../styles/theme.css";
import "../styles/header.css";

export default function Account() {
  const dispatch = useDispatch();
  const selectTheme = (state: RootState) => state.theme.value;
  const currentTheme = useSelector(selectTheme);
  const [viewSignup, setViewSignup] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.uid) dispatch(setUser(user));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="layout" id={currentTheme}>
      <Header />
      <div className="main">
        <div className="content">
          {user.user.uid ? (
            <AccountView setViewSignup={setViewSignup} />
          ) : viewSignup ? (
            <SignupView setViewSignup={setViewSignup} />
          ) : (
            <LoginView setViewSignup={setViewSignup} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
