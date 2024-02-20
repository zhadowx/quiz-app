export default function FinishedScreen({
  points,
  maxPossiblePoints,
  highscore,
  onRestart,
}: Readonly<{
  points: number;
  maxPossiblePoints: number;
  highscore: number;
  onRestart: any;
}>) {
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
