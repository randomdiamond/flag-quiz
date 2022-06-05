import Answers from './Answers.js'
import FlagCounter from './FlagCounter.js'
import Nav from './Nav.js'
import flagQuizData from './flagQuizData.js'
import PreviousResult from './PreviousResult.js'
import {useState, useEffect} from 'react'

export default function Quiz(){
  useEffect(() => {
    setNewFlag()
  },[])

  const [answersData, setAnswersData] = useState()
  const [guessedCorrect, setGuessedCorrect] = useState()
  const [flagCounter, setFlagCounter] = useState(-1)

function setNewFlag(){
  console.log("run")
  setFlagCounter(prevCounter => prevCounter +1)
  let newCorrectAnswer = flagQuizData[Math.floor(Math.random()*244)]
  console.log(newCorrectAnswer)
  let newAnswers = [newCorrectAnswer]
 while (newAnswers.length < 3){
   let newAnswer = flagQuizData[Math.floor(Math.random()*244)]
 newAnswer.continent === newCorrectAnswer.continent && newAnswer.code !== newCorrectAnswer.code && newAnswers.push(newAnswer)
 }
 setAnswersData(
   {answers:[...newAnswers , flagQuizData[Math.floor(Math.random()*244)]].sort(() => Math.random() - 0.5),
  correct_answer: newCorrectAnswer
   }
  )
}
function checkAnswer(selectedAnswer){
  
selectedAnswer === answersData.correct_answer ? setGuessedCorrect({correct:true, correct_answer:answersData.correct_answer.german}) 
: setGuessedCorrect({correct:false, correct_answer:answersData.correct_answer.german})
setAnswersData()
setNewFlag()
}

    return(
        <>
        <Nav />
        <div className="quiz-container">
        <FlagCounter flagCounter={flagCounter}/>
        {answersData && <img className="flag" alt="flag" src={`https://countryflagsapi.com/svg/${answersData.correct_answer.code}`}/>}
        {answersData && <Answers checkAnswer={checkAnswer} answers= {answersData.answers}/>}
        {guessedCorrect && <PreviousResult guessedCorrect={guessedCorrect}/>}
        </div>
        </>
    )
}