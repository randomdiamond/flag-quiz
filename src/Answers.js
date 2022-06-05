import { nanoid } from "nanoid";

export default function Answers({answers, checkAnswer}){
    return(
        <div className="answers-container">
           {answers.map(answer => (
               <button key={nanoid()} onClick={() => checkAnswer(answer)}>{answer.german}</button>
           ))}
        </div>
    )
}