import { State } from "../interfaces/QuizContext";

export const initialState: State = {
  questions: [],
  // 'loading', 'error', 'ready', 'active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
