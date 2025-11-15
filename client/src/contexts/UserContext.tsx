import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuth } from "../app/hooks";
import api from "../services/api";

interface UserData {
  coins: number;
  themes: string[];
  selectedTheme: string;
}

interface UserContextType {
  userData: UserData | null;
  updateUserData: () => Promise<void>;
  addCoins: (amount: number) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  const updateUserData = useCallback(async () => {
    if (!currentUser) {
      setUserData(null);
      return;
    }

    try {
      const response = await api.get(`/api/user/${currentUser.uid}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    }
  }, [currentUser]);

  const addCoins = async (amount: number) => {
    if (!currentUser) return;

    try {
      const response = await api.put(`/api/user/addCoins/${currentUser.uid}`, {
        coinsToAdd: amount,
      });

      // Update local state with new coin balance
      if (userData) {
        setUserData({
          ...userData,
          coins: response.data.coins,
        });
      }
    } catch (error) {
      console.error("Error adding coins:", error);
    }
  };

  useEffect(() => {
    updateUserData();
  }, [updateUserData]);

  const value = {
    userData,
    updateUserData,
    addCoins,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
