import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { environment } from "../environments/evironment";

import { initialState } from "../constants/InitialState";

import { Action, QuizContextProps, State } from "../interfaces/QuizContext";

const QuizContext = createContext<QuizContextProps>({} as QuizContextProps);

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
        secondsRemaining: state.questions.length * environment.secsPerQuestion,
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

function QuizProvider({ children }: Readonly<{ children: any }>) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc: number, question: any) => acc + question.points,
    0
  );

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

  const loadAndShuffleQuestions = useCallback(() => {
    fetch(environment.apiUrl)
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
          environment.numberOfQuestions
        );
        dispatch({ type: "dataReceived", payload: questions });
      })
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  const handleRestart = useCallback(() => {
    loadAndShuffleQuestions(); // Re-fetch and shuffle on restart
    dispatch({ type: "restart" }); // Reset the quiz state
  }, [loadAndShuffleQuestions, dispatch]);

  const contextValue = useMemo(
    () => ({
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      dispatch,
      title: environment.quizTitle,
      handleRestart,
      numQuestions,
      maxPossiblePoints,
    }),
    [
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      dispatch,
      handleRestart,
      numQuestions,
      maxPossiblePoints,
    ]
  );

  useEffect(() => {
    loadAndShuffleQuestions(); // Call this function on component mount
  }, [loadAndShuffleQuestions]);

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
}

function useQuiz() {
  const context = createContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
