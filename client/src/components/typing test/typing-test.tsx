import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../app/hooks";
import { getAuth } from "firebase/auth";
import { TestStatus, charRegex } from "../../constants/constants";
import { CharObject, Results } from "./typing-test.interface";
import TestStats from "./test-stats";
import useTimer from "../../useTimer";
import api from "../../services/api";
import { getResults, updateAccuracy } from "./typing-test.utils";

function TypingTest() {
  const [prompt, setPrompt] = useState(
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Suspendisse potenti. Sed lectus."
  );

  const [testStatus, setTestStatus] = useState(TestStatus.Idle);
  const { seconds, start, pause } = useTimer();
  const [index, setIndex] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [results, setResults] = useState<Results | null>(null);

  const { theme } = useTheme();
  const user = getAuth().currentUser;

  useEffect(() => {
    async function fetchQuote() {
      /*
      // Fetch a random quote from the Quotable API
      const response = await fetch(
        "http://api.quotable.io/random?minLength=150&maxLength=500"
      );
      const data = await response.json();
      if (response.ok) {
        setPrompt(data.content);
      } else {
        console.log("Quote unable to be fetched", data.content);
      }
        */
      setPrompt("bruh bruh bruh");
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

  const handleTestStart = useCallback(() => {
    setIndex(0);
    start();
    setResults(null);
    setTestStatus(TestStatus.Running);
  }, [start, setResults, setTestStatus]);

  const handleTestEnd = useCallback(() => {
    if (testStatus !== TestStatus.Complete) {
      setTestStatus(TestStatus.Complete);
      pause();
      setResults(getResults({ prompt, charArray, index }));

      if (user) {
        console.log({
          firebaseID: user.uid,
          prompt,
          wordsTyped: results?.wordsTyped,
          wordMistakes: results?.wordMistakes,
          charsTyped: results?.charsTyped,
          charMistakes: results?.charMistakes,
          seconds,
        });
        /*
        try {
          await api.post("/api/test/", {
          firebaseID: user.uid,
          prompt,
          wordsTyped: results.wordsTyped,
          wordMistakes: results.wordMistakes,
          charsTyped: results.charsTyped,
          charMistakes: results.charMistakes,
          seconds,
        });
        } catch (error) {
          console.error(error);
        }
        */
      }
    }
  }, [
    charArray,
    index,
    pause,
    prompt,
    results?.charMistakes,
    results?.charsTyped,
    results?.wordMistakes,
    results?.wordsTyped,
    seconds,
    testStatus,
    user,
  ]);

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
      updateAccuracy({
        charArray,
        index,
        setAccuracy,
      });
    }
    if (index == charArray.length) {
      handleTestEnd();
    }
  }, [charArray, handleTestEnd, index]);

  if (testStatus == TestStatus.Complete) {
    return (
      <div className="test-container">
        <TestStats results={results} />
      </div>
    );
  }

  const typedChars: CharObject[] = charArray.slice(0, index);
  const untypedChars: CharObject[] = charArray.slice(index, charArray.length);

  const TypedChars: React.FC = () => {
    return (
      <span>
        {typedChars.map((charObject, index) => (
          <span
            key={index}
            className={"char-object"}
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
        {untypedChars.map((charObject, index) => (
          <span
            key={index}
            className="char-object"
            style={{ color: theme.untypedChar }}
          >
            {charObject.character}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="test-container">
      <div className="typing-field">
        <TypedChars />
        <UntypedChars />
      </div>
      {testStatus == TestStatus.Running && (
        <div>
          <h2 className="typing-field-time">{seconds}s</h2>
          <h2 className="typing-field-time">{accuracy}%</h2>
          <h2 className="typing-field-time">{index}</h2>
        </div>
      )}
    </div>
  );
}

export default TypingTest;
