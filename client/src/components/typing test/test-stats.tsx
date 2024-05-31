interface TestStatsProps {
  totalWords: number;
  wordsTyped: number;
  wordMistakes: number;
  wordAccuracy: number;
  totalChars: number;
  charsTyped: number;
  charMistakes: number;
  charAccuracy: number;
  seconds: number;
}

function TestStats({
  totalWords,
  wordsTyped,
  wordMistakes,
  wordAccuracy,
  totalChars,
  charsTyped,
  charMistakes,
  charAccuracy,
  seconds,
}: TestStatsProps) {
  return (
    <div>
      <p>Total words: {totalWords}</p>
      <p>Words typed correctly: {wordsTyped}</p>
      <p>Words typed incorrectly: {wordMistakes}</p>
      <p>Word accuracy: {wordAccuracy}%</p>
      <br></br>
      <p>Total characters: {totalChars}</p>
      <p>Characters typed correctly: {charsTyped}</p>
      <p>Character typed incorrectly: {charMistakes}</p>
      <p>Character accuracy: {charAccuracy}%</p>
      <br></br>
      <p>Seconds: {seconds}s</p>
    </div>
  );
}

export default TestStats;
