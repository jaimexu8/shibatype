import { useState, useEffect, useCallback, CSSProperties } from "react";
import { useTheme, useUser } from "../../app/hooks";
import { useToast } from "../../hooks/useToast";
import { getAuth } from "firebase/auth";
import { TestStatus, charRegex } from "../../constants/constants";
import { CharObject, Results, Settings } from "./typing-test.interface";
import {
  getResults,
  updateStats,
  calculateGoldReward,
} from "./typing-test.utils";
import {
  faRotateRight,
  faGear,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTimer from "../../useTimer";
import api from "../../services/api";
import SettingsDialog from "./settings-dialog";

function TypingTest() {
  const [prompt, setPrompt] = useState(" ");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [flashColor, setFlashColor] = useState<string>("");

  const [testStatus, setTestStatus] = useState(TestStatus.Idle);
  const { seconds, start, pause, reset } = useTimer();
  const [index, setIndex] = useState(0);
  const [wpm, setWpm] = useState("0.0");
  const [accuracy, setAccuracy] = useState("0.00");
  const [results, setResults] = useState<Results | null>(null);
  const [settings, setSettings] = useState<Settings>({ wordCount: 30 });

  const { theme } = useTheme();
  const { addCoins } = useUser();
  const { showToast } = useToast();
  const user = getAuth().currentUser;

  // Flash animation effect
  useEffect(() => {
    if (testStatus !== TestStatus.Complete) {
      setFlashColor(theme.textColor);
      return;
    }

    const interval = setInterval(() => {
      setFlashColor((prevColor) =>
        prevColor === theme.textColor ? theme.primaryColor : theme.textColor
      );
    }, 500);

    return () => clearInterval(interval);
  }, [testStatus, theme.textColor, theme.primaryColor]);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await api.get("/api/test/prompt/", {
          params: { wordCount: settings.wordCount },
        });
        if (res.data && res.data.prompt && typeof res.data.prompt === 'string') {
          setPrompt(res.data.prompt);
        } else {
          console.error("Invalid prompt received from server");
          setPrompt("the quick brown fox jumps over the lazy dog");
        }
      } catch (error) {
        console.error(error);
        setPrompt("the quick brown fox jumps over the lazy dog");
      }
    }

    if (testStatus == TestStatus.Idle) fetchQuote();
  }, [testStatus, settings.wordCount]);

  const [charArray, setCharArray] = useState(
    (prompt || " ").split("").map((char) => {
      return {
        character: char,
        correct: false,
      };
    })
  );

  useEffect(() => {
    if (prompt) {
      setCharArray(
        prompt.split("").map((char) => ({
          character: char,
          correct: false,
        }))
      );
    }
  }, [prompt]);

  const handleResetTest = useCallback(() => {
    setIndex(0);
    reset();
    setWpm("0");
    setAccuracy("0");
    setResults(null);
    setTestStatus(TestStatus.Idle);
  }, [reset]);

  const handleTestStart = useCallback(() => {
    setIndex(0);
    start();
    setResults(null);
    setTestStatus(TestStatus.Running);
  }, [start, setResults, setTestStatus]);

  const handleTestEnd = useCallback(async () => {
    if (testStatus !== TestStatus.Complete) {
      setTestStatus(TestStatus.Complete);
      pause();
      const testResults = getResults({
        prompt,
        charArray,
        index,
        seconds: Math.max(seconds, 1),
      });
      setResults(testResults);

      if (user) {
        const calculatedGoldReward = calculateGoldReward({
          wpm: testResults.wpm,
          charAccuracy: testResults.charAccuracy,
          wordAccuracy: testResults.wordAccuracy,
          totalWords: testResults.totalWords,
        });

        try {
          await addCoins(calculatedGoldReward);
          showToast(
            <span>
              +{calculatedGoldReward}{" "}
              <FontAwesomeIcon icon={faCoins} style={{ marginLeft: "4px" }} />
            </span>,
            "success",
            3000
          );
        } catch (error) {
          console.error("Failed to award gold:", error);
          showToast("Failed to award gold", "error", 3000);
        }
      }
    }
  }, [
    charArray,
    index,
    pause,
    prompt,
    seconds,
    testStatus,
    user,
    addCoins,
    showToast,
  ]);

  useEffect(() => {
    if (results && user) {
      const postResults = async () => {
        try {
          await api.post("/api/test/", {
            firebaseID: user.uid,
            displayName: user.displayName,
            wpm: results?.wpm,
            accuracy: results?.charAccuracy,
            prompt,
            wordsTyped: results?.wordsTyped,
            wordMistakes: results?.wordMistakes,
            charsTyped: results?.charsTyped,
            charMistakes: results?.charMistakes,
            seconds: Math.max(seconds, 1),
          });
        } catch (error) {
          console.error(error);
        }
      };
      postResults();
    }
  }, [prompt, results, seconds, user]);

  const openSettings = () => {
    setSettingsOpen(true);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  const handleWordCountChange = (newWordCount: number) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      wordCount: newWordCount,
    }));
    handleResetTest();
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!charRegex(event.key) && event.key !== "Backspace") return;
      if (testStatus == TestStatus.Idle) handleTestStart();

      if (event.key === "Backspace") {
        if (index == 0) return 0;
        setCharArray((currentCharArray) => {
          const newCharArray = [...currentCharArray];
          newCharArray[index - 1].correct = false;
          return newCharArray;
        });
        setIndex(index - 1);
        return;
      }

      setCharArray((currentCharArray) => {
        const charObj = currentCharArray[index];
        if (event.key == charObj.character) {
          currentCharArray[index] = {
            character: charObj.character,
            correct: true,
          };
        }
        return currentCharArray;
      });

      setIndex(index + 1);
    };
    if (testStatus != TestStatus.Complete) {
      window.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    index,
    prompt,
    pause,
    start,
    charArray,
    testStatus,
    user,
    seconds,
    handleTestStart,
    handleTestEnd,
  ]);

  useEffect(() => {
    if (index > 0) {
      updateStats({
        charArray,
        index,
        seconds: Math.max(seconds, 1),
        setWpm,
        setAccuracy,
      });
    }
    if (index == charArray.length) {
      handleTestEnd();
    }
  }, [charArray, handleTestEnd, index, seconds]);

  const typedChars: CharObject[] = charArray.slice(0, index);
  const untypedChars: CharObject[] = charArray.slice(index, charArray.length);

  const TypedChars: React.FC = () => {
    return (
      <span>
        {typedChars.map((charObject, index) => (
          <span
            key={index}
            style={
              charObject.correct
                ? { color: theme.typedChar }
                : { color: theme.typedChar, background: theme.incorrectChar }
            }
          >
            {charObject.character}
          </span>
        ))}
      </span>
    );
  };

  const UntypedChars: React.FC = () => {
    return (
      <span>
        {untypedChars.map((charObject, index) => {
          const style: CSSProperties = {
            color: index === 0 ? theme.secondaryColor : theme.untypedChar,
            borderBottomColor: theme.secondaryColor,
            borderBottom: index === 0 ? "4px solid" : "none",
            animation: index === 0 ? "blink 2s infinite" : "none",
            "--blink-color": theme.secondaryColor,
          } as CSSProperties;

          return (
            <span
              key={index}
              style={style}
              className={index === 0 ? "blinking-underline" : ""}
            >
              {charObject.character}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="typing-test-container">
      <div className="typing-test-stats">
        <div className="flex-grow text-left">
          <span>wpm: {parseFloat(wpm).toFixed(2)}</span>
          <span className="ml-4">acc: {parseFloat(accuracy).toFixed(2)}%</span>
        </div>
        <div className="flex justify-center space-x-5">
          <FontAwesomeIcon
            icon={faRotateRight}
            onClick={handleResetTest}
            style={{
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "color 0.2s ease",
              color: flashColor || theme.textColor,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = theme.primaryColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = flashColor || theme.textColor)
            }
          />
          <FontAwesomeIcon
            icon={faGear}
            onClick={openSettings}
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
              (e.currentTarget.style.backgroundColor = theme.backgroundColor)
            }
          />
        </div>
      </div>
      <div className="typing-test-text">
        <TypedChars />
        <UntypedChars />
      </div>
      <div>
        <span>{seconds}s</span>
      </div>
      <SettingsDialog
        open={settingsOpen}
        onClose={closeSettings}
        onWordCountChange={handleWordCountChange}
        currentWordCount={settings.wordCount}
      />
    </div>
  );
}

export default TypingTest;
