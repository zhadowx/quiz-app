import { useQuiz } from "../contexts/QuizContext";
import { QuizContextProps } from "../interfaces/QuizContext";

export default function FinishedScreen() {
  const {
    points,
    maxPossiblePoints,
    highscore,
    handleRestart: onRestart,
  } = useQuiz() as unknown as QuizContextProps;
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 60 && percentage < 80) emoji = "🥉";
  if (percentage < 60) emoji = "🥴";
  if (percentage === 0) emoji = "🤦🏽‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={() => onRestart()}>
        Restart Quiz
      </button>
    </>
  );
}
