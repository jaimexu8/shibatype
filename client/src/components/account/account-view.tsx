import { useAuth } from "../../app/hooks";
import { AccountViewType } from "../../constants/constants";

interface AccountViewProps {
  setAccountViewType: React.Dispatch<React.SetStateAction<AccountViewType>>;
}

export default function AccountView({ setAccountViewType }: AccountViewProps) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setAccountViewType(AccountViewType.Login);
  };

  return (
    <div>
      <h1>Account</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
