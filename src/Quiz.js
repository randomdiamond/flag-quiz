import Answers from './Answers.js'
import FlagCounter from './FlagCounter.js'
import Nav from './Nav.js'
import {useState, useEffect} from 'react'

export default function Quiz(){
    useEffect(() => {
        
        async function sendApiRequest() {
          let response = await fetch(
            `https://restcountries.com/v3.1/region/europe`
          );
          let data = await response.json();
          console.log(data)
          
          
        }
        sendApiRequest()
    }, [] );
    return(
        <>
        <Nav />
        <div className="quiz-container">
        <FlagCounter />
        <img className="flag" alt="flag" src='https://countryflagsapi.com/svg/germany'/>
        <Answers />
        </div>
        </>
    )
}