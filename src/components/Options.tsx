import { useQuiz } from "../contexts/QuizContext";
import { QuizContextProps } from "../interfaces/QuizContext";

export default function Options({ question }: Readonly<{ question: any }>) {
  const { answer, dispatch } = useQuiz() as unknown as QuizContextProps;
  const hasAnswered = answer !== null;
  function styleOptions(index: number) {
    let style = "";
    if (hasAnswered) {
      if (index === answer) {
        style = "answer ";
      }
      if (index === question.correctOption) {
        style += "correct";
      } else {
        style += "wrong";
      }
    }
    return style;
  }

  return (
    <div className="options">
      {question.options.map((option: any, index: number) => (
        <button
          className={`btn btn-option ${styleOptions(index)}`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
