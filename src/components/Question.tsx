import Options from "./Options";

export default function Question({
  question,
  dispatch,
  answer,
}: Readonly<{ question: any; dispatch: React.Dispatch<any>; answer: any }>) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
