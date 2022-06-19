import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faHourglass,
  faFaceFrown,
  faThumbsUp,
  faFaceSmile,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";
export default function Results({
  answerResultsData,
  allPoints,
  answersCorrect,
  flagCounter,
  restartQuiz,
  miliSeconds
}) {
  function determineStyles(answer, correct, selected) {
    if (correct === answer) {
      return { backgroundColor: "#94D7A2" };
    } else if (answer === selected && selected !== correct)
      return { backgroundColor: "#F8BCBC" };
  }

  return (
    <>
      <h1 className="results-header">Ergebnis</h1>
      <div className="results-container">
        <div className="results-data-wrapper">
          <FontAwesomeIcon
            className="quick-results-icon"
            icon={faCircleCheck}
          />{" "}
          {answersCorrect} / 10
        </div>
        <div className="results-data-wrapper-average">
        <img alt="points" className="points-icon" src="points-icon.svg" />
          {allPoints}
        </div>

        <div className="results-data-wrapper">
        <FontAwesomeIcon className="quick-results-icon" icon={faHourglass} />
          {allPoints <= 10
            ? "egal"
            : `${miliSeconds/1000} s`}
          
        </div>
      </div>
      {flagCounter > 10 && (
        <p className="results-message">
          Du hast insgesamt <b>{allPoints} Punkte </b>erzielt <br />
        </p>
      )}
      {answersCorrect < 4 && flagCounter > 10 && (
        <p className="results-message">
          Das schaffst du besser{" "}
          <FontAwesomeIcon className="sad-face" icon={faFaceFrown} />
        </p>
      )}
      {answersCorrect > 3 && flagCounter > 10 && answersCorrect < 8 && (
        <p className="results-message">
          Das ist schon nicht schlecht{" "}
          <FontAwesomeIcon className="thumbs-up" icon={faThumbsUp} />
        </p>
      )}
      {answersCorrect > 7 && flagCounter > 10 && (
        <p className="results-message">
          Du bist ein wahrer Flaggen Meister{" "}
          <FontAwesomeIcon className="smiley" icon={faFaceSmile} />
        </p>
      )}

      <div className="restart-button-container">
        <button className="restart-button" onClick={restartQuiz}>
          Erneut spielen
        </button>
      </div>
      {flagCounter > 10 && (
        <div className="answers-results-container">
          {answerResultsData.map((resultData) => (
            <div key={nanoid()} className="answers-result-wrapper">
              <img
                className="results-flag"
                alt="results-flag"
                key={nanoid()}
                src={`https://countryflagsapi.com/svg/${resultData.code}`}
              />
              {resultData.answers.map((answer) => (
                <button
                  style={determineStyles(
                    answer.german,
                    resultData.correct,
                    resultData.selected
                  )}
                  key={nanoid()}
                >
                  {answer.german}
                </button>
              ))}
              {resultData.correct === resultData.selected ? (
                <FontAwesomeIcon
                  className="correct-icon"
                  icon={faCircleCheck}
                />
              ) : (
                <FontAwesomeIcon className="wrong-icon" icon={faCircleXmark} />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
