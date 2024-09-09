import { useState, useEffect, useCallback, CSSProperties } from "react";
import { useTheme } from "../../app/hooks";
import { getAuth } from "firebase/auth";
import { TestStatus, charRegex } from "../../constants/constants";
import { CharObject, Results } from "./typing-test.interface";
import { getResults, updateStats } from "./typing-test.utils";
import { faRotateRight, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTimer from "../../useTimer";
import api from "../../services/api";

function TypingTest() {
  const [prompt, setPrompt] = useState(" ");

  const [testStatus, setTestStatus] = useState(TestStatus.Idle);
  const { seconds, start, pause, reset } = useTimer();
  const [index, setIndex] = useState(0);
  const [wpm, setWpm] = useState("0.0");
  const [accuracy, setAccuracy] = useState("0.00");
  const [results, setResults] = useState<Results | null>(null);

  const { theme } = useTheme();
  const user = getAuth().currentUser;

  useEffect(() => {
    async function fetchQuote() {
      const response = await fetch(
        "http://api.quotable.io/random?minLength=150&maxLength=500"
      );
      const data = await response.json();
      if (response.ok) {
        setPrompt(data.content);
      } else {
        console.log("Quote unable to be fetched", data.content);
      }
    }

    if (testStatus == TestStatus.Idle) fetchQuote();
  }, [testStatus]);

  const [charArray, setCharArray] = useState(
    prompt.split("").map((char) => {
      return {
        character: char,
        correct: false,
      };
    })
  );

  useEffect(() => {
    setCharArray(
      prompt.split("").map((char) => ({
        character: char,
        correct: false,
      }))
    );
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
      setResults(
        getResults({ prompt, charArray, index, seconds: Math.max(seconds, 1) })
      );
    }
  }, [charArray, index, pause, prompt, seconds, testStatus]);

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

  const openSettingsDialog = () => {};

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
    <div className="flex flex-col justify-center items-center text-2xl">
      <div className="flex flex-row justify-between space-x-5 w-full">
        <div className="flex-grow text-left">
          <span>wpm: {wpm}</span>
          <span className="ml-4">acc: {accuracy}%</span>
        </div>
        <div className="flex justify-center space-x-5">
          <FontAwesomeIcon
            icon={faRotateRight}
            onClick={handleResetTest}
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
          <FontAwesomeIcon
            icon={faGear}
            onClick={openSettingsDialog}
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
      <div className="my-5">
        <TypedChars />
        <UntypedChars />
      </div>
      <div>
        <span>{seconds}s</span>
      </div>
    </div>
  );
}

export default TypingTest;
