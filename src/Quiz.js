import Answers from './Answers.js'
import FlagCounter from './FlagCounter.js'
import Nav from './Nav.js'
import flagQuizData from './flagQuizData.js'
import PreviousResult from './PreviousResult.js'
import Points from './Points.js'
import Results from './Results.js'
import {useState, useEffect} from 'react'

export default function Quiz(){
  
  useEffect(() => {
    setNewFlag()
  },[])

  const [answersData, setAnswersData] = useState()
  const [guessedCorrect, setGuessedCorrect] = useState()
  const [flagCounter, setFlagCounter] = useState(-1)
  const [answerResultsData, setAnswerResultsData] = useState()
  const [allPoints, setAllPoints] = useState(0)
  const [answersCorrect, setAnswersCorrect] = useState()
  
function restartQuiz(){
  setAnswerResultsData()
  setAnswersData()
  setGuessedCorrect()
  setFlagCounter(0)
  setNewFlag()
}
function deliverResults(answersCorrect, allPoints){
  setAllPoints(allPoints)
  setAnswersCorrect(answersCorrect)
}


function findDublications(){
  if(answerResultsData){
  
    let answer = flagQuizData[Math.floor(Math.random()*244)]
    let duplications = 0
    
    for(let t = 0; t < answerResultsData.length; t++){
      answer.code === answerResultsData[t].code && duplications++
      
      
      
  }
  if(duplications === 0){
    
    return answer
  }
  else{
    
     answer = flagQuizData[Math.floor(Math.random()*244)]
    let duplications = 0
    for(let t = 0; t < answerResultsData.length; t++){
      answer.code === answerResultsData[t] && duplications++
      
  }
  if(duplications === 0){
     return answer
  }
  else{
    answer = flagQuizData[Math.floor(Math.random()*244)]
    let duplications = 0
    for(let t = 0; t < answerResultsData.length; t++){
      answer.code === answerResultsData[t] && duplications++
      
  }
  if(duplications === 0){
     return answer
  }
  else{
    return flagQuizData[Math.floor(Math.random()*244)]
  }
  
  
   
  
  }}

}
else{
return flagQuizData[Math.floor(Math.random()*244)]
}
}

function setNewFlag(){

  setFlagCounter(prevCounter => prevCounter +1)
  




  
let newCorrectAnswer = findDublications()
let newAnswers = [newCorrectAnswer]
 

 while (newAnswers.length < 3){
  
   
  let newAnswer = flagQuizData[Math.floor(Math.random()*244)]
  if(newAnswers.length === 2){
    

    newAnswer.continent === newCorrectAnswer.continent && newAnswer.code !== newCorrectAnswer.code && newAnswer.code !== newAnswers[1].code && newAnswers.push(newAnswer)
  }
  else{
  
    newAnswer.continent === newCorrectAnswer.continent && newAnswer.code !== newCorrectAnswer.code && newAnswers.push(newAnswer)
  }
 }
 
 
 while(newAnswers.length < 4){
  let newAnswer = flagQuizData[Math.floor(Math.random()*244)]
  newAnswer.code !== newCorrectAnswer.code && newAnswer.code !== newAnswers[1].code && newAnswer.code !== newAnswers[2].code && newAnswers.push(newAnswer)
 }
 
 newAnswers = newAnswers.sort(() => Math.random() - 0.5)
 setAnswersData(
   {answers:newAnswers,
  correct_answer: newCorrectAnswer
   }
  )
  
  
}

function checkAnswer(selectedAnswer){
  answerResultsData ? setAnswerResultsData(prevData => [...prevData,{answers:answersData.answers, correct:answersData.correct_answer.german, selected:selectedAnswer.german, code:answersData.correct_answer.code}])
  : setAnswerResultsData( [{answers:answersData.answers, correct:answersData.correct_answer.german, selected:selectedAnswer.german, code:answersData.correct_answer.code}])
selectedAnswer === answersData.correct_answer ? setGuessedCorrect({correct:true, correct_answer:answersData.correct_answer.german}) 
: setGuessedCorrect({correct:false, correct_answer:answersData.correct_answer.german})
setAnswersData()
setNewFlag()
}

    return(
        <>
        <Nav />
        <div className="quiz-container">
          
        {flagCounter <= 10 && <FlagCounter flagCounter={flagCounter}/>}
        {answersData && flagCounter <= 10 && <img className="flag" alt="flag" src={`https://countryflagsapi.com/svg/${answersData.correct_answer.code}`}/>}
        {answersData && flagCounter <= 10 && <Answers checkAnswer={checkAnswer} answers= {answersData.answers}/>}
        {guessedCorrect && flagCounter <= 10 && <PreviousResult guessedCorrect={guessedCorrect}/>}
        {answersData && <Points deliverResults={deliverResults} answerResultsData={answerResultsData} guessCorrect={guessedCorrect ? guessedCorrect.correct :undefined} flagCounter={flagCounter} />}
        {answersCorrect >=0 && flagCounter > 10 && <Results restartQuiz={restartQuiz} allPoints={allPoints} answersCorrect={answersCorrect} answerResultsData={answerResultsData} flagCounter={flagCounter} />}

        </div>
        </>
    )
}