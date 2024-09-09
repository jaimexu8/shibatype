export default interface CreateTestData {
  firebaseID: string;
  displayName: string;
  wpm: number;
  accuracy: number;
  prompt: string;
  wordsTyped: number;
  wordMistakes: number;
  charsTyped: number;
  charMistakes: number;
  seconds: number;
}
