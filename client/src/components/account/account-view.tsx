import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth, useTheme } from "../../app/hooks";
import { AccountViewType } from "../../constants/constants";
import { useEffect, useState } from "react";
import api from "../../services/api";
import UserTestsTable from "./user-tests-table";

interface Test {
  wpm: number;
  accuracy: number;
  date: string;
  seconds: number;
  wordsTyped: number;
}

interface AccountViewProps {
  setAccountViewType: React.Dispatch<React.SetStateAction<AccountViewType>>;
}

export default function AccountView({ setAccountViewType }: AccountViewProps) {
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTests = async () => {
      if (currentUser?.uid) {
        try {
          const response = await api.get(`/api/test/user/${currentUser.uid}`);
          setTests(response.data);
        } catch (error) {
          console.error("Error fetching user tests:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserTests();
  }, [currentUser?.uid]);

  const handleLogout = async () => {
    await logout();
    setAccountViewType(AccountViewType.Login);
  };

  const totalTests = tests.length;
  const totalTimeTyped = tests.reduce((total, test) => total + test.seconds, 0);

  const averageWpm =
    tests.length > 0
      ? tests.reduce((sum, test) => sum + test.wpm, 0) / tests.length
      : 0;
  const averageAccuracy =
    tests.length > 0
      ? tests.reduce((sum, test) => sum + test.accuracy, 0) / tests.length
      : 0;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
            <p>{loading ? "Loading..." : totalTests}</p>
          </div>
          <div>
            <p style={{ color: theme.secondaryColor }}>Time Typed</p>
            <p>{loading ? "Loading..." : formatTime(totalTimeTyped)}</p>
          </div>
          <div>
            <p style={{ color: theme.secondaryColor }}>Avg WPM</p>
            <p>{loading ? "Loading..." : averageWpm.toFixed(1)}</p>
          </div>
          <div>
            <p style={{ color: theme.secondaryColor }}>Avg Accuracy</p>
            <p>{loading ? "Loading..." : averageAccuracy.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {!loading && tests.length > 0 && (
        <div className="mt-6">
          <h3 style={{ color: theme.textColor, marginBottom: "1rem" }}>
            Test History
          </h3>
          <UserTestsTable tests={tests} />
        </div>
      )}

      {!loading && tests.length === 0 && (
        <div className="mt-6 text-center">
          <p style={{ color: theme.secondaryColor }}>
            No tests completed yet. Start typing to see your results here!
          </p>
        </div>
      )}
    </div>
  );
}
