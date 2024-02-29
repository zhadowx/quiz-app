import { useQuiz } from "../contexts/QuizContext";
import { QuizContextProps } from "../interfaces/QuizContext";
import Options from "./Options";

export default function Question() {
  const { questions, index } = useQuiz() as unknown as QuizContextProps;
  const question = questions.at(index);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
