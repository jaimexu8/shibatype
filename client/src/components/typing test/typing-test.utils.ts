import {
  GetResultParameters,
  UpdateStatsParameters,
} from "./typing-test.interface";

export function updateStats({
  charArray,
  index,
  seconds,
  setWpm,
  setAccuracy,
}: UpdateStatsParameters) {
  if (seconds == 0) {
    seconds = 1;
  }
  let correctChars = 0;
  let correctWords = 0;
  let wordCorrect = true;
  for (let i = 0; i < index; i++) {
    if (charArray[i].correct) {
      correctChars++;
    } else {
      wordCorrect = false;
    }
    if (charArray[i].character === " ") {
      if (wordCorrect) {
        correctWords++;
      }
      wordCorrect = true;
    }
  }
  setWpm(((correctWords / seconds) * 60).toFixed(1));
  setAccuracy(((correctChars / index) * 100).toFixed(2));
}

export function getResults({
  prompt,
  charArray,
  index,
  seconds,
}: GetResultParameters) {
  const wordArray = prompt.split(" ");
  const totalWords = wordArray.length;
  let wordsTyped = 0;
  let wordMistakes = 0;

  let wordCorrect = true;
  let i = 0;
  while (i < index) {
    if (charArray[i].character === " " || i == index - 1) {
      if (wordCorrect) wordsTyped += 1;
      else {
        wordMistakes += 1;
        wordCorrect = true;
      }
    } else {
      if (!charArray[i].correct) wordCorrect = false;
    }
    i++;
  }

  let wordAccuracy = 0;
  if (wordsTyped > 0) {
    wordAccuracy = parseFloat(((wordsTyped / totalWords) * 100).toFixed(2));
  }

  let charsTyped = 0;
  let charMistakes = 0;
  for (let i = 0; i < index; i++) {
    if (charArray[i].correct) {
      charsTyped += 1;
    } else {
      charMistakes += 1;
    }
  }

  const totalChars = charArray.length;
  let charAccuracy = 0;
  if (charsTyped > 0) {
    charAccuracy = parseFloat(((charsTyped / totalChars) * 100).toFixed(2));
  }

  const wpm = (wordsTyped / seconds) * 60;

  return {
    wpm,
    seconds,
    totalWords,
    wordsTyped,
    wordMistakes,
    wordAccuracy,
    totalChars,
    charsTyped,
    charMistakes,
    charAccuracy,
  };
}
