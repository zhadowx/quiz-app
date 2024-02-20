export default function StartScreen({
  numQuestions,
  dispatch,
}: Readonly<{
  numQuestions: number;
  dispatch: React.Dispatch<any>;
}>) {
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
