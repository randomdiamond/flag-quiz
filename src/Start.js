import Nav from './Nav.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag} from '@fortawesome/free-solid-svg-icons'


export default function Start({startQuiz}){
    return(
        <>      
        <Nav />   
        <div className="start-container">
        <div className="start-button-container">
        <FontAwesomeIcon className="flag-icon" icon={faFlag} />
        <button onClick={startQuiz}>Start </button>
        </div>
        </div>
        </>
    )
}