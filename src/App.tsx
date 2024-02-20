import { useEffect, useReducer } from "react";
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

const SECS_PER_QUESTION = 30;
const QUIZ_API = "http://localhost:3001/questions";
const QUIZ_TITLE = "The React Quiz";
const NUMBER_OF_QUESTIONS = 10;

interface State {
  questions: any;
  status: string;
  index: number;
  answer: any;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
}

interface Action {
  type: string;
  payload?: any[];
}
const initialState: State = {
  questions: [],
  // 'loading', 'error', 'ready', 'active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "dataReceived": {
      return {
        ...state,
        questions: action.payload ?? state.questions,
        status: "ready",
      };
    }

    case "dataFailed": {
      return { ...state, status: "error" };
    }
    case "start": {
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    }
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion": {
      return { ...state, index: state.index++, answer: null };
    }
    case "finish": {
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }
    case "restart": {
      return {
        ...initialState,
        questions: action.payload ?? state.questions,
        status: "ready",
      };
    }
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining && state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }
    default: {
      throw new Error("Invalid action type");
    }
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc: number, question: any) => acc + question.points,
    0
  );

  const handleRestart = () => {
    loadAndShuffleQuestions(); // Re-fetch and shuffle on restart
    dispatch({ type: "restart" }); // Reset the quiz state
  };

  // Shuffle function using the Fisher-Yates (Knuth) Shuffle algorithm
  function shuffleArray(array: any[]) {
    const shuffledArray = array.slice(); // Create a copy of the array to avoid mutating the original data
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // Swap elements
    }
    return shuffledArray;
  }

  const loadAndShuffleQuestions = () => {
    fetch(QUIZ_API)
      .then((response) => response.json())
      .then((data) => {
        const shuffledQuestions = shuffleArray(data);

        const questionsWithShuffledOptions = shuffledQuestions.map(
          (question) => {
            // Shuffle the options
            const options = shuffleArray(question.options);
            // Find the new index of the correct answer after shuffling
            const correctOption = options.indexOf(
              question.options[question.correctOption]
            );

            return {
              ...question,
              options,
              correctOption, // Update the correctOption index
            };
          }
        );

        const questions = questionsWithShuffledOptions.slice(
          0,
          NUMBER_OF_QUESTIONS
        );
        dispatch({ type: "dataReceived", payload: questions });
      })
      .catch(() => dispatch({ type: "dataFailed" }));
  };

  useEffect(() => {
    loadAndShuffleQuestions(); // Call this function on component mount
  }, []);

  return (
    <div className="app">
      <Header title={QUIZ_TITLE} />
      <MainEl>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                numQuestions={numQuestions}
                index={index}
                dispatch={dispatch}
                answer={answer}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            onRestart={handleRestart}
          />
        )}
      </MainEl>
    </div>
  );
}
