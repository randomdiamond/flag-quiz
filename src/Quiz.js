import Answers from "./Answers.js";
import FlagCounter from "./FlagCounter.js";
import Nav from "./Nav.js";
import flagQuizData from "./flagQuizData.js";
import PreviousResult from "./PreviousResult.js";
import Points from "./Points.js";
import Results from "./Results.js";
import { useState, useEffect } from "react";

export default function Quiz() {
  useEffect(() => {
    setNewFlag();
  }, []);

  const [answersData, setAnswersData] = useState();
  const [guessedCorrect, setGuessedCorrect] = useState();
  const [flagCounter, setFlagCounter] = useState(-1);
  const [allPoints, setAllPoints] = useState();
  const [answersCorrect, setAnswersCorrect] = useState();
  const [miliSeconds, setMiliseconds] = useState();

  function restartQuiz() {
    console.log("r")
    setAnswersData();
    setGuessedCorrect();
    setFlagCounter(0);

  }
  useEffect(() => {
    flagCounter === 0 && setNewFlag()
  }, [flagCounter])
  function deliverResults(answersCorrect, allPoints, miliSeconds) {
    setAllPoints(allPoints);
    setMiliseconds(miliSeconds);
    setAnswersCorrect(answersCorrect);
  }

  function findDublications() {
    if (answersData) {
      let answer = flagQuizData[Math.floor(Math.random() * 244)];
      let duplications = 0;

      for (let t = 0; t < answersData.length; t++) {
        answer.code === answersData[t].code && duplications++;
      }
      if (duplications === 0) {
        return answer;
      } else {

        answer = flagQuizData[Math.floor(Math.random() * 244)];
        let duplications = 0;
        for (let t = 0; t < answersData.length; t++) {
          answer.code === answersData[t] && duplications++;
        }
        if (duplications === 0) {
          return answer;
        } else {
          answer = flagQuizData[Math.floor(Math.random() * 244)];
          let duplications = 0;
          for (let t = 0; t < answersData.length; t++) {
            answer.code === answersData[t] && duplications++;
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
  { console.log(answersData) }
  function setNewFlag() {
    console.log("new flag")
    console.log(flagCounter)
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

      newAnswers = newAnswers.sort(() => Math.random() - 0.5);
      console.log(newAnswers)
      if (answersData) {
        setAnswersData(prevAnswersData => [...prevAnswersData, { answers: newAnswers, correct_answer: newCorrectAnswer }])
      }
      else {
        setAnswersData([{ answers: newAnswers, correct_answer: newCorrectAnswer }])
      }
    }
  }

  function checkAnswer(selectedAnswer) {
    setAnswersData(prevData => prevData.map((dataItem, index) => index + 1 === prevData.length ? { ...dataItem, selectedAnswer } : dataItem))

    selectedAnswer === answersData[answersData.length - 1].correct_answer
      ? setGuessedCorrect({
        correct: true,
        correct_answer: answersData[answersData.length - 1].correct_answer.german,
      })
      : setGuessedCorrect({
        correct: false,
        correct_answer: answersData[answersData.length - 1].correct_answer.german,
      });
    setNewFlag(selectedAnswer);
  }

  return (
    <>
      <Nav />
      <div className="quiz-container">
        {flagCounter <= 10 && <FlagCounter flagCounter={flagCounter} />}
        {answersData && flagCounter <= 10 && (
          <img
            className="flag"
            alt="flag"
            src={`https://countryflagsapi.com/svg/${answersData[answersData.length - 1].correct_answer.code}`}
          />
        )}
        {answersData && (
          <Points
            deliverResults={deliverResults}
            guessCorrect={guessedCorrect ? guessedCorrect.correct : undefined}
            flagCounter={flagCounter}
          />
        )}
        {answersData && flagCounter <= 10 && (
          <Answers checkAnswer={checkAnswer} answers={answersData[answersData.length - 1].answers} />
        )}
        {guessedCorrect && flagCounter <= 10 && (
          <PreviousResult guessedCorrect={guessedCorrect} />
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
    </>
  );
}
