import Quiz from "./Quiz.js";
import Start from "./Start.js";
import Leaderboard from "./Leaderboard.js";
import "./App.scss";
import { useState, useEffect } from "react";
import Axios from 'axios'
function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState()

  useEffect(() => {
    getLeaderboardData()

  }, [])
  function getLeaderboardData() {
    Axios.get("https://flag-quiz-backend.up.railway.app/getLeaderboard")
      .then((response) => {
        setLeaderboardData(response.data.sort((a, b) => (b.points - a.points)))

      }
      )
  }


  function startQuiz() {
    setQuizStarted(true);
  }
  function updateLeaderboardData(newLeaderboard) {
    setLeaderboardData(newLeaderboard)
  }
  return (
    <>
      {quizStarted && <Quiz getLeaderboardData={getLeaderboardData} leaderboardData={leaderboardData} updateLeaderboardData={updateLeaderboardData} />}
      {!quizStarted && <div >
        <div className='relative-start-container'><Start startQuiz={startQuiz} /></div>

        <Leaderboard leaderboardData={leaderboardData} />
      </div>}

    </>
  );
}

export default App;
