import Header from "./components/Header";
import MainEl from "./components/MainEl";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { QuizContextProps } from "./interfaces/QuizContext";
import { useQuiz } from "./contexts/QuizContext";

export default function App() {
  const { status } = useQuiz() as unknown as QuizContextProps;
  return (
    <div className="app">
      <Header />
      <MainEl>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {status === "finished" && <FinishedScreen />}
      </MainEl>
    </div>
  );
}
