export interface QuizContextProps {
  questions: any;
  status: string;
  index: number;
  answer: any;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
  dispatch: any;
  title: string;
  handleRestart: () => void;
  numQuestions: number;
  maxPossiblePoints: number;
}
export interface State {
  questions: any;
  status: string;
  index: number;
  answer: any;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
}

export interface Action {
  type: string;
  payload?: any[];
}
