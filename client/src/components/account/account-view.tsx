import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { clearUser } from "../../app/userSlice";

interface accountViewProps {
  setViewSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountView({ setViewSignup }: accountViewProps) {
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      await signOut(auth);
      setViewSignup(false);
      dispatch(clearUser());
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
