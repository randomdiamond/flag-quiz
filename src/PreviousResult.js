import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark} from '@fortawesome/free-solid-svg-icons'

export default function Result({guessedCorrect}){
    
    return(
<div className="previous-result-container">
{guessedCorrect.correct ? <FontAwesomeIcon className="correct-icon" icon={faCircleCheck} /> : <FontAwesomeIcon className="wrong-icon" icon={faCircleXmark} />}
<span className="result-message" style={guessedCorrect.correct ? {color: '#18A558'} : {color: '#f72626'}}>
{guessedCorrect.correct_answer} {guessedCorrect.correct ? "war die richtige Antwort" : "wäre richtig gewesen"}</span>


</div>
    )
}