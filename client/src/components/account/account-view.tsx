import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { AccountViewType } from "../../constants/constants";

interface AccountViewProps {
  setAccountViewType: React.Dispatch<React.SetStateAction<AccountViewType>>;
}

export default function AccountView({ setAccountViewType }: AccountViewProps) {
  const logoutUser = async () => {
    try {
      await signOut(auth);
      setAccountViewType(AccountViewType.Login);
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
