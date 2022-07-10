import { useState, useEffect } from "react";


export default function Points({ flagCounter, guessCorrect, deliverResults }) {
  const [points, setPoints] = useState(1000);
  const [allPoints, setAllPoints] = useState(0);
  const [miliSeconds, setMiliseconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [answersCorrect, setAnswersCorrect] = useState(0);

  useEffect(() => {
    if (flagCounter <= 1) {
      setAllPoints(0);
      setAnswersCorrect(0);
      setMiliseconds(0);
    }
    if (flagCounter > 1) {

      guessCorrect
        ? setAllPoints((prevPoints) => prevPoints + points)
        : setAllPoints((prevPoints) => prevPoints + 1);
      setMiliseconds(prevTime => prevTime + (points - 1000) * (-30))

      guessCorrect && setAnswersCorrect((prevAmount) => prevAmount + 1);
      setPoints(1000);
    }
    setTimerOn(true);
  }, [flagCounter]);
  useEffect(() => {
    if (flagCounter === 11) {
      deliverResults(answersCorrect, allPoints, miliSeconds);
      setTimerOn(false);
    }
  }, [allPoints]);
  useEffect(() => {
    setTimerOn(true);
  }, []);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        if (points > 100) {
          setPoints((prevPoints) => prevPoints - 1);

        }
      }, 30);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);
  useEffect(() => {
    if (points <= 500) {
      setTimerOn(false)
    }
  }, [points])
  return (
    <>
      {flagCounter <= 10 && (
        <div className="points-container">
          <div style={{ width: `${points / 11}%` }} className="statusbar">
            <h3>{points}</h3>
          </div>
        </div>
      )}
    </>
  );
}
