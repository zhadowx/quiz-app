import { useQuiz } from "../contexts/QuizContext";
import { QuizContextProps } from "../interfaces/QuizContext";

export default function Progress() {
  const { index, answer, numQuestions, points, maxPossiblePoints } =
    useQuiz() as unknown as QuizContextProps;
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>
          {points} / {maxPossiblePoints}
        </strong>
      </p>
    </header>
  );
}
