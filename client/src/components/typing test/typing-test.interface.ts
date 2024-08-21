export interface CharObject {
  character: string;
  correct: boolean;
}

export interface UpdateStatsParameters {
  charArray: CharObject[];
  index: number;
  seconds: number;
  setWpm: React.Dispatch<React.SetStateAction<string>>;
  setAccuracy: React.Dispatch<React.SetStateAction<string>>;
}

export interface GetResultParameters {
  prompt: string;
  charArray: CharObject[];
  index: number;
  seconds: number;
}

export interface Results {
  wpm: number;
  seconds: number;
  totalWords: number;
  wordsTyped: number;
  wordMistakes: number;
  wordAccuracy: number;
  totalChars: number;
  charsTyped: number;
  charMistakes: number;
  charAccuracy: number;
}
