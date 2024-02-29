import { useQuiz } from "../contexts/QuizContext";
import { QuizContextProps } from "../interfaces/QuizContext";

function Header() {
  const { title } = useQuiz() as unknown as QuizContextProps;
  return (
    <header className="app-header">
      <img src="test-icon.svg" alt="React logo" />
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
