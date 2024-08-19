export interface CharObject {
  character: string;
  correct: boolean;
}

export interface UpdateAccuracyParameters {
  charArray: CharObject[];
  index: number;
  setAccuracy: React.Dispatch<React.SetStateAction<number>>;
}

export interface GetResultParameters {
  prompt: string;
  charArray: CharObject[];
  index: number;
}

export interface Results {
  totalWords: number;
  wordsTyped: number;
  wordMistakes: number;
  wordAccuracy: number;
  totalChars: number;
  charsTyped: number;
  charMistakes: number;
  charAccuracy: number;
}
