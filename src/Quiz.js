import Answers from "./Answers.js";
import FlagCounter from "./FlagCounter.js";
import Nav from "./Nav.js";
import flagQuizData from "./flagQuizData.js";
import PreviousResult from "./PreviousResult.js";
import Points from "./Points.js";
import Results from "./Results.js";
import GameWonOverlay from "./GameWonOverlay.js";
import Leaderboard from "./Leaderboard.js";
import Axios from 'axios'
import { useState, useEffect } from "react";

export default function Quiz({ leaderboardData, updateLeaderboardData, getLeaderboardData }) {


  const [answersData, setAnswersData] = useState();
  const [flagCounter, setFlagCounter] = useState(0);
  const [allPoints, setAllPoints] = useState();
  const [answersCorrect, setAnswersCorrect] = useState();
  const [miliSeconds, setMiliseconds] = useState();
  const [gamesPlayed, setGamesPlayed] = useState(1)
  const [gameWonOverlayActive, setGameWonOverlayActive] = useState(false)
  const [leaderboardPosition, setLeaderboardPosition] = useState()
  useEffect(() => {
    setNewFlag();

  }, []);
  useEffect(() => {
    if (flagCounter === 11) {

      if (leaderboardData.length < 50 || allPoints > leaderboardData[leaderboardData.length - 1].points) {
        function determineLeaderboardRank() {
          let positionIndex = Math.floor(leaderboardData.length / 2)
          let step = leaderboardData.length / 4
          if (leaderboardData.length > 1) {
            while (((allPoints > leaderboardData[positionIndex - 1].points) || (allPoints <= leaderboardData[positionIndex].points))) {

              if (allPoints <= leaderboardData[positionIndex].points) {
                console.log("smaller", positionIndex, step)
                positionIndex = Math.ceil(positionIndex + step)
                console.log(positionIndex)
              }
              else if (allPoints > leaderboardData[positionIndex].points) {
                console.log("bigger", positionIndex, step)
                positionIndex = Math.floor(positionIndex - step)
              }
              if (positionIndex === 0 || positionIndex === leaderboardData.length - 1) {

                break
              }
              console.log(leaderboardData.length, "lb length", leaderboardData)
              console.log("positionIndex", positionIndex, step)
              step = (step > 0 && step != 4) ? Math.ceil(step / 2) : 1

            }
          }
          else if (leaderboardData.length === 1) {
            positionIndex = allPoints > leaderboardData[0] ? 0 : 1
          }
          setLeaderboardPosition(positionIndex + 1)
          console.log(positionIndex)


        }
        determineLeaderboardRank()
        setGameWonOverlayActive(true)
      }
    }
  }, [allPoints])

  async function updateLeaderboard(username) {
    if ((username.length >= 3 && username.length <= 16) && (leaderboardData.length < 50 || allPoints > leaderboardData[49].points)) {
      console.log("true")
      setGameWonOverlayActive(false)
      //let newLeaderboardData = leaderboardData
      console.log(leaderboardData)


      if (leaderboardData.length >= 50) {

        Axios.delete(`https://flagquiz.cyclic.app/deleteLeaderboardEntry/${leaderboardData[49]._id}`, {
          headers: {
            'Authorization': 'Bearer ' + process.env.API_KEY
          }
        }).then((response) => { console.log(response) }
        )
          .catch((error) => {
            console.log(error);
          })


        const newLeaderboardEntry = { username, points: allPoints } // username ist Kurzschreibweise für username:username
        Axios.post("https://flagquiz.cyclic.app/updateLeaderboard", {
          headers: {
            'Authorization': 'Bearer ' + process.env.API_KEY
          }
        }, newLeaderboardEntry)
          .then((response) => {

            getLeaderboardData()
          }
          )
          .catch((error) => {
            console.log(error);
          })

      }
    }
  }


  useEffect(() => {
    gamesPlayed > 1 && setNewFlag();

  }, [gamesPlayed]);

  function deliverResults(answersCorrect, allPoints, miliSeconds) {

    setAllPoints(allPoints);
    setMiliseconds(miliSeconds);
    setAnswersCorrect(answersCorrect);

  }
  function restartQuiz() {

    setAnswersData();
    setFlagCounter(0);
    setGamesPlayed(prevGames => prevGames + 1)
  }
  function findDublications() {
    if (answersData) {
      let answer = flagQuizData[Math.floor(Math.random() * 244)];
      let duplications = 0;

      for (let t = 0; t < answersData.length; t++) {
        answer.code === answersData[t].correct_answer.code && duplications++;
      }
      answersData.find(dataItem => dataItem.correct_answer.code === answer.code)
      if (duplications === 0) {
        return answer;
      } else {

        answer = flagQuizData[Math.floor(Math.random() * 244)];
        duplications = 0;
        for (let t = 0; t < answersData.length; t++) {
          answer.code === answersData[t].correct_answer.code && duplications++;
        }
        if (duplications === 0) {
          return answer;
        } else {
          answer = flagQuizData[Math.floor(Math.random() * 244)];
          duplications = 0;
          for (let t = 0; t < answersData.length; t++) {
            answer.code === answersData[t].correct_answer.code && duplications++;
          }
          if (duplications === 0) {
            return answer;
          } else {
            return flagQuizData[Math.floor(Math.random() * 244)];
          }
        }
      }
    } else {
      return flagQuizData[Math.floor(Math.random() * 244)];
    }
  }

  function setNewFlag() {

    setFlagCounter((prevCounter) => prevCounter + 1);

    if (flagCounter < 10) {
      let newCorrectAnswer = findDublications();

      let newAnswers = [newCorrectAnswer];

      while (newAnswers.length < 3) {
        let newAnswer = flagQuizData[Math.floor(Math.random() * 244)];
        if (newAnswers.length === 2) {
          newAnswer.continent === newCorrectAnswer.continent &&
            newAnswer.code !== newCorrectAnswer.code &&
            newAnswer.code !== newAnswers[1].code &&
            newAnswers.push(newAnswer);
        } else {
          newAnswer.continent === newCorrectAnswer.continent &&
            newAnswer.code !== newCorrectAnswer.code &&
            newAnswers.push(newAnswer);
        }
      }

      while (newAnswers.length < 4) {
        let newAnswer = flagQuizData[Math.floor(Math.random() * 244)];
        newAnswer.code !== newCorrectAnswer.code &&
          newAnswer.code !== newAnswers[1].code &&
          newAnswer.code !== newAnswers[2].code &&
          newAnswers.push(newAnswer);
      }

      newAnswers = shuffleArray(newAnswers)

      if (answersData) {
        setAnswersData(prevAnswersData => [...prevAnswersData, { answers: newAnswers, correct_answer: newCorrectAnswer }])
      }
      else {
        setAnswersData([{ answers: newAnswers, correct_answer: newCorrectAnswer }])
      }
    }
  }

  function checkAnswer(selectedAnswer) {
    setAnswersData(prevData => prevData.map((dataItem, index) => index + 1 === prevData.length
      ? { ...dataItem, selectedAnswer: selectedAnswer, guessedCorrect: { correct: selectedAnswer === dataItem.correct_answer, correct_answer: dataItem.correct_answer.german } }
      : dataItem))


    setNewFlag();
  }
  function shuffleArray(unshuffledArray) {

    let shuffledArray = unshuffledArray
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    return shuffledArray
  }
  const styles = {
    filter: 'blur(7px)',
    pointerEvents: 'none',
    userSelect: 'none'
  }
  return (
    <div style={{
      position: 'relative',
    }}>

      <div style={gameWonOverlayActive ? styles : {}}>
        <Nav />
        <div className="quiz-container">
          {flagCounter <= 10 && <FlagCounter flagCounter={flagCounter} />}
          {answersData && flagCounter <= 10 && (
            <img
              className="flag"
              alt="flag"
              src={`https://flagcdn.com/${answersData[answersData.length - 1].correct_answer.code}.svg`}
            />
          )}
          {answersData && (
            <Points
              deliverResults={deliverResults}
              guessCorrect={flagCounter > 1 ? answersData[answersData.length - 2].guessedCorrect.correct : undefined}
              flagCounter={flagCounter}
            />
          )}

          {answersData && flagCounter <= 10 && (
            <Answers checkAnswer={checkAnswer} answers={answersData[answersData.length - 1].answers} />
          )}
          {answersData && answersData.length > 1 && flagCounter <= 10 && (
            <PreviousResult guessedCorrect={answersData[answersData.length - 2].guessedCorrect} />
          )}

          {answersCorrect >= 0 && flagCounter > 10 && (
            <Results
              restartQuiz={restartQuiz}
              allPoints={allPoints}
              answersCorrect={answersCorrect}
              answerResultsData={answersData}
              flagCounter={flagCounter}
              miliSeconds={miliSeconds}
            />
          )}
        </div>
      </div>
      {answersCorrect >= 0 && flagCounter > 10 && (
        <Leaderboard leaderboardData={leaderboardData} />
      )}
      {gameWonOverlayActive && <GameWonOverlay updateLeaderboard={updateLeaderboard} leaderboardPosition={leaderboardPosition} />}


    </div >
  );
}
