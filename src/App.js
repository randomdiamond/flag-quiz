import Quiz from './Quiz.js'
import Start from './Start.js'
import './App.scss';
import {useState} from 'react'

function App() {
  const [quizStarted, setQuizStarted] = useState(false)

  function startQuiz(){
    setQuizStarted(true)
  }
  
  return (
    <>
{quizStarted && <Quiz />}
{!quizStarted && <Start startQuiz={startQuiz}/>}
    </>
  );
}

export default App;
