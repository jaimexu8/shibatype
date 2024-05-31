import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../app/uidSlice";

interface accountViewProps {
  setViewSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountView({ setViewSignup }: accountViewProps) {
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      setViewSignup(false);
      dispatch(logout());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Account</h1>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}
