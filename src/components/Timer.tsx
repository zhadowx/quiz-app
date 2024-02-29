import { useEffect } from "react";
import { QuizContextProps } from "../interfaces/QuizContext";
import { useQuiz } from "../contexts/QuizContext";

export default function Timer() {
  const { secondsRemaining, dispatch } =
    useQuiz() as unknown as QuizContextProps;
  const minutes = secondsRemaining && Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining && secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes && minutes < 10 && "0"}
      {minutes}:{seconds && seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
