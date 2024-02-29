import { useQuiz } from "../contexts/QuizContext";
import { QuizContextProps } from "../interfaces/QuizContext";

export default function NextButton() {
  const { answer, index, numQuestions, dispatch } =
    useQuiz() as unknown as QuizContextProps;
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
}
