import {
  GetResultParameters,
  UpdateAccuracyParameters,
} from "./typing-test.interface";

export function updateAccuracy({
  charArray,
  index,
  setAccuracy,
}: UpdateAccuracyParameters) {
  let correct = 0;

  for (let i = 0; i < index; i++) {
    if (charArray[i].correct) {
      correct++;
    }
  }

  setAccuracy(parseFloat(((correct / index) * 100).toFixed(2)));
}

export function getResults({ prompt, charArray, index }: GetResultParameters) {
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

  return {
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
