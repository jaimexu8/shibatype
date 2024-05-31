import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TestStats from "./test-stats.tsx";
import useTimer from "../../useTimer.ts";
import axios from "axios";

interface charObjects {
  character: string;
  correct: boolean;
}

interface RootState {
  uid: {
    value: string;
  };
}

function TypingTest() {
  const uid = useSelector((state: RootState) => state.uid.value);
  const [paragraph, setParagraph] = useState(
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Suspendisse potenti. Sed lectus."
  );

  const [testRunning, setTestRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { seconds, start, pause } = useTimer();
  const [index, setIndex] = useState(0);

  const [totalWords, setTotalWords] = useState(0);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [wordMistakes, setWordMistakes] = useState(0);
  const [wordAccuracy, setWordAccuracy] = useState(0);

  const [totalChars, setTotalChars] = useState(0);
  const [charsTyped, setCharsTyped] = useState(0);
  const [charMistakes, setCharMistakes] = useState(0);
  const [charAccuracy, setCharAccuracy] = useState(0);

  useEffect(() => {
    async function fetchQuote() {
      // Fetch a random quote from the Quotable API
      const response = await fetch(
        "http://api.quotable.io/random?minLength=150&maxLength=500"
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Quote fetched: ", data.content);
        setParagraph(data.content);
      } else {
        console.log("Quote unable to be fetched", data.content);
        // TODO: Create function to call from local database if quote cannot be fetched
      }
    }
    if (!showResults) fetchQuote();
  }, [showResults]);

  const [charArray, setCharArray] = useState(
    paragraph.split("").map((char) => {
      return {
        character: char,
        correct: false,
      };
    })
  );

  useEffect(() => {
    setCharArray(
      paragraph.split("").map((char) => ({
        character: char,
        correct: false,
      }))
    );
  }, [paragraph]);

  const charRegex = (key: string) => {
    return /^[a-zA-Z0-9 ,./?;:'"-_]$/i.test(key);
  };

  useEffect(() => {
    const handleTestStart = () => {
      setIndex(0);
      //start(60);
      start();
      setTestRunning(true);
      console.log("Test running");
    };

    const handleTestEnd = async () => {
      updateAccuracy({
        paragraph,
        charArray,
        index,
        setTotalWords,
        setWordsTyped,
        setWordMistakes,
        setWordAccuracy,
        setTotalChars,
        setCharsTyped,
        setCharMistakes,
        setCharAccuracy,
      });
      setTestRunning(false);
      pause();
      setShowResults(true);

      // Send test results to server
      try {
        const testResponse = await axios.post("/api/tests", {
          uid,
          paragraph,
          totalWords,
          wordsTyped,
          wordMistakes,
          wordAccuracy,
          totalChars,
          charsTyped,
          charMistakes,
          charAccuracy,
          seconds,
        });
        console.log(testResponse);
        if (testResponse.status >= 200 && testResponse.status < 300) {
          // Add test results to user
          const testId = testResponse.data.testId;
          const userResponse = await axios.post(`/api/users/${uid}/tests`, {
            testId,
          });
          console.log(userResponse);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (!charRegex(event.key) && event.key !== "Backspace") return;
      if (!testRunning) handleTestStart();

      setIndex((currentIndex) => {
        if (event.key === "Backspace") {
          // return current index if it's already 0
          if (currentIndex === 0) return 0;
          // Set the previous character to incorrect
          setCharArray((currentCharArray) => {
            const newCharArray = [...currentCharArray];
            newCharArray[currentIndex - 1].correct = false;
            return newCharArray;
          });
          return currentIndex - 1;
        }

        if (event.key === charArray[currentIndex].character) {
          // Set the current character to correct
          setCharArray((currentCharArray) => {
            const newCharArray = [...currentCharArray];
            newCharArray[currentIndex].correct = true;
            return newCharArray;
          });
        } else {
          // Handle incorrect character
        }

        if (currentIndex === charArray.length - 1) {
          handleTestEnd();
        }

        return currentIndex + 1; // Return the new index
      });
    };
    if (!showResults) {
      // Add the event listener
      window.addEventListener("keydown", handleKeyPress);
    }
    // Clean up the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    index,
    paragraph,
    pause,
    start,
    showResults,
    charArray,
    testRunning,
    uid,
    totalWords,
    wordsTyped,
    wordMistakes,
    wordAccuracy,
    totalChars,
    charsTyped,
    charMistakes,
    charAccuracy,
    seconds,
  ]);

  if (showResults) {
    return (
      <div className="test-container">
        <TestStats
          totalWords={totalWords}
          wordsTyped={wordsTyped}
          wordMistakes={wordMistakes}
          wordAccuracy={wordAccuracy}
          totalChars={totalChars}
          charsTyped={charsTyped}
          charMistakes={charMistakes}
          charAccuracy={charAccuracy}
          seconds={seconds}
        />
      </div>
    );
  }

  // Separate charArray to typed characters and untyped characters
  const typedChars: charObjects[] = charArray.slice(0, index);
  const untypedChars: charObjects[] = charArray.slice(index, charArray.length);

  const TypedChars: React.FC = () => {
    return (
      <span>
        {typedChars.map((charObject, index) => (
          <span
            key={index}
            className={
              "char-object " +
              (charObject.correct
                ? "typed-correct-char"
                : "typed-incorrect-char")
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
          <span key={index} className="char-object untyped-char">
            {charObject.character}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="typing-field">
      <TypedChars />
      <UntypedChars />
      <p>Time: {seconds}s</p>
    </div>
  );
}

interface updateAccuracyParameters {
  paragraph: string;
  charArray: charObjects[];
  index: number;
  setTotalWords: React.Dispatch<React.SetStateAction<number>>;
  setWordsTyped: React.Dispatch<React.SetStateAction<number>>;
  setWordMistakes: React.Dispatch<React.SetStateAction<number>>;
  setWordAccuracy: React.Dispatch<React.SetStateAction<number>>;
  setTotalChars: React.Dispatch<React.SetStateAction<number>>;
  setCharsTyped: React.Dispatch<React.SetStateAction<number>>;
  setCharMistakes: React.Dispatch<React.SetStateAction<number>>;
  setCharAccuracy: React.Dispatch<React.SetStateAction<number>>;
}

function updateAccuracy({
  paragraph,
  charArray,
  index,
  setTotalWords,
  setWordsTyped,
  setWordMistakes,
  setWordAccuracy,
  setTotalChars,
  setCharsTyped,
  setCharMistakes,
  setCharAccuracy,
}: updateAccuracyParameters) {
  const wordArray = paragraph.split(" ");
  setTotalWords(wordArray.length);
  let wordsTyped = 0;
  let wordMistakes = 0;

  let wordCorrect = true;
  let i = 0;
  while (i <= index) {
    if (charArray[i].character === " " || i == index) {
      if (wordCorrect) wordsTyped += 1;
      else {
        wordMistakes += 1;
        wordCorrect = true; // Reset for next word
      }
    } else {
      if (!charArray[i].correct) wordCorrect = false;
    }
    i++;
  }

  setWordsTyped(wordsTyped);
  setWordMistakes(wordMistakes);
  if (wordsTyped > 0) {
    setWordAccuracy(
      parseFloat(((wordsTyped / wordArray.length) * 100).toFixed(2))
    );
  } else {
    setWordAccuracy(0);
  }

  setTotalChars(charArray.length);
  let charsTyped = 0;
  let charMistakes = 0;
  for (let i = 0; i <= index; i++) {
    if (charArray[i].correct) {
      charsTyped += 1;
    } else {
      charMistakes += 1;
    }
  }
  setCharsTyped(charsTyped);
  setCharMistakes(charMistakes);
  if (charsTyped > 0) {
    setCharAccuracy(
      parseFloat(((charsTyped / charArray.length) * 100).toFixed(2))
    );
  }
}

export default TypingTest;
