import { useState, useEffect } from "react";import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





export default function Points({flagCounter, guessCorrect, deliverResults}){
    
    const [points, setPoints] = useState(1000)
    const [allPoints, setAllPoints] = useState(0)
    const [timerOn, setTimerOn] = useState(false);
    const [answersCorrect, setAnswersCorrect] = useState(0)

    useEffect(() => {
      if(flagCounter <= 1){
        setAllPoints(0)
        setAnswersCorrect(0)
      }
      if(flagCounter > 1){
        console.log(flagCounter)
        guessCorrect ? setAllPoints(prevPoints => prevPoints + points) : setAllPoints(prevPoints => prevPoints + 1)
        guessCorrect && setAnswersCorrect(prevAmount => prevAmount + 1)
        setPoints(1000) 
                }   
                setTimerOn(true)
        
 
    },[flagCounter])
useEffect(() =>{
  console.log(flagCounter)
  if(flagCounter === 11){
    deliverResults(answersCorrect, allPoints)
    setTimerOn(false)
    
 }
},[allPoints])
    useEffect(() => {
         setTimerOn(true)

           
    },[])
    console.log(points)
    useEffect(() => {
      let interval = null;
  
      if (timerOn) {
        interval = setInterval(() => {
          if(points > 100){
               setPoints((prevPoints) => prevPoints - 1);}
         
        }, 30);
      }
       else if (!timerOn) {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [timerOn]);
    

    return(
        <>
         {flagCounter <= 10 && <div className="points-container">
            <div style={{width:`${points/10}%`}} className="statusbar">
                <h3>{points}</h3>
            </div>
            
        </div>}
   
        </>
    )
}