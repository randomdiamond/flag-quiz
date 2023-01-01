import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRankingStar, faCircleInfo, faCircleUser, faCircleExclamation, faCircleCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import Fireworks from './Fireworks';

export default function GameWonOverlay({ updateLeaderboard, leaderboardPosition }) {

    const [username, setUsername] = useState("")
    const [indicationMessage, setIndicationMessage] = useState({
        message: 'Gib einen Namen ein um dein Ergebnis in die Bestenliste einzutragen',
        icon: faCircleInfo,
        color: 'blue'
    })
    const [isInputFocussed, setIsInputFocussed] = useState(false)
    const [isConfettiOn, setIsConfettiOn] = useState(true)

    useEffect(() => {
        setIsConfettiOn(true)
        setTimeout(() => {
            setIsConfettiOn(false)

        }, 2000)

    }, [])


    function checkInputEntry(value) {
        setUsername(value)
        console.log(isInputFocussed)
        if (value.length > 0 && value.length <= 2) {
            const newIndicationMessage = { message: 'Dein Name muss mindestens 3 Zeichen enthalten', icon: faCircleExclamation, color: 'red' }
            newIndicationMessage !== indicationMessage && setIndicationMessage(newIndicationMessage)
        }
        else if (value.length > 2 && value.length <= 16) {
            const newIndicationMessage = { message: 'valider Name', icon: faCircleCheck, color: 'green' }
            newIndicationMessage !== indicationMessage && setIndicationMessage(newIndicationMessage)
        }
        else if (!value) {
            const newIndicationMessage = { message: 'Gebe einen Namen ein um dein Ergebnis in die Bestenliste einzutragen', icon: faCircleInfo, color: 'blue' }
            newIndicationMessage !== indicationMessage && setIndicationMessage(newIndicationMessage)
        }
        else if (value.length > 16) {
            const newIndicationMessage = { message: 'Dein Name darf maximal 16 Zeichen enthalten', icon: faCircleExclamation, color: 'red' }
            newIndicationMessage !== indicationMessage && setIndicationMessage(newIndicationMessage)
        }

    }


}
return (
    <>
        <div className='overlay-container'>
            <h2>Herzlichen Glückwunsch</h2>
            <div className='rank-container'>
                <FontAwesomeIcon className='ranking-star-icon' icon={faRankingStar} />
                <strong>{leaderboardPosition}.Platz</strong> erreicht
            </div>

            <div className={`indication-message ${indicationMessage.color} `}>
                <FontAwesomeIcon className='info-icon' icon={indicationMessage.icon} /><p> {indicationMessage.message}</p>
            </div>
            <div className={`${isInputFocussed ? 'focussed' : ''} username-input-wrapper`}>
                <FontAwesomeIcon className='user-icon' icon={faCircleUser} />

                <input placeholder='username' onFocus={() => setIsInputFocussed(true)} onBlur={() => setIsInputFocussed(false)} onChange={(event) => checkInputEntry(event.target.value)} value={username} autoFocus />
            </div>
            <button onClick={() => updateLeaderboard(username)}>
                eintragen <FontAwesomeIcon className='arrow-right' icon={faArrowRight} />
            </button>
        </div >
        <Fireworks isConfettiOn={isConfettiOn} />

    </>
)
}