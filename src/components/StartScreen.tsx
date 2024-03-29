import { useQuiz } from "../contexts/QuizContext";
import { QuizContextProps } from "../interfaces/QuizContext";

export default function StartScreen() {
  const { numQuestions, dispatch } = useQuiz() as unknown as QuizContextProps;
  return (
    <div className="start">
      <h3>Welcome to the React Quiz!</h3>
      <p>{numQuestions} question to test your React Mastery</p>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let's start
      </button>
    </div>
  );
}
