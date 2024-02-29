export default function Options({
  question,
  dispatch,
  answer,
}: Readonly<{ question: any; dispatch: React.Dispatch<any>; answer: any }>) {
  const hasAnswered = answer !== null;
  function styleOptions(index: number) {
    let style = "";
    if (hasAnswered) {
      if (index === answer) {
        style = "answer ";
      }
      if (index === question.correctOption) {
        style += "correct";
      } else {
        style += "wrong";
      }
    }
    return style;
  }

  return (
    <div className="options">
      {question.options.map((option: any, index: number) => (
        <button
          className={`btn btn-option ${styleOptions(index)}`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
