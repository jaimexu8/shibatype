import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth, useTheme } from "../../app/hooks";
import { AccountViewType } from "../../constants/constants";

interface AccountViewProps {
  setAccountViewType: React.Dispatch<React.SetStateAction<AccountViewType>>;
}

export default function AccountView({ setAccountViewType }: AccountViewProps) {
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();

  const handleLogout = async () => {
    await logout();
    setAccountViewType(AccountViewType.Login);
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-row w-full rounded-lg p-5"
        style={{ background: theme.primaryDark }}
      >
        <div className="mx-15 flex flex-row items-center">
          <FontAwesomeIcon
            icon={faUser}
            style={{
              padding: "5px",
            }}
          />
          <p className="mr-2" style={{ color: theme.secondaryColor }}>
            {currentUser?.displayName}
          </p>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            onClick={handleLogout}
            style={{
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = theme.primaryColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = theme.primaryDark)
            }
          />
        </div>
        <div className="flex justify-evenly w-full">
          <div>
            <p style={{ color: theme.secondaryColor }}>Tests Completed</p>
            <p>0</p>
          </div>
          <div>
            <p style={{ color: theme.secondaryColor }}>Time Typed</p>
            <p>00:00:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
