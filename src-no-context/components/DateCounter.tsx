import { ChangeEvent, useReducer } from "react";

interface Action {
  type: ActionType;
  payload?: number;
}

interface State {
  count: number;
  step: number;
}

enum ActionType {
  INC = "inc",
  DEC = "dec",
  SET_COUNT = "setCount",
  SET_STEP = "setStep",
  RESET = "reset",
}
function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.INC:
      return { ...state, count: state.count + state.step };
    case ActionType.DEC:
      return { ...state, count: state.count - state.step };
    case ActionType.SET_COUNT:
      return { ...state, count: action.payload ?? state.count };
    case ActionType.SET_STEP:
      return { ...state, step: action.payload ?? state.step };
    case ActionType.RESET:
      return { count: 0, step: 1 };
    default:
      return state;
  }
}

function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date = new Date("June 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: ActionType.DEC });
  };

  const inc = function () {
    dispatch({ type: ActionType.INC });
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: ActionType.SET_COUNT, payload: Number(e.target.value) });
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: ActionType.SET_STEP, payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: ActionType.RESET });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
