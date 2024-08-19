import { Results } from "./typing-test.interface";

interface TestStatsProps {
  results: Results | null;
}

function TestStats({ results }: TestStatsProps) {
  if (!results) {
    return <div>No results available</div>;
  }

  return (
    <div>
      <p>Total Words: {results.totalWords}</p>
      <p>Words Typed: {results.wordsTyped}</p>
      <p>Word Mistakes: {results.wordMistakes}</p>
      <p>Word Accuracy: {results.wordAccuracy}%</p>
      <p>Total Characters: {results.totalChars}</p>
      <p>Characters Typed: {results.charsTyped}</p>
      <p>Character Mistakes: {results.charMistakes}</p>
      <p>Character Accuracy: {results.charAccuracy}%</p>
    </div>
  );
}

export default TestStats;
