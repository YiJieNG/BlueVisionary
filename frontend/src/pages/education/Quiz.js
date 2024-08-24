import CommonNavbar from "../../components/Navbar/CommonNavbar";
import { Container, Row, Col, Button } from "reactstrap";
import React, { useState } from "react";
import SeaTurtle from "../../assets/img/SeaTurtle.jpg";
import PlasticPollution from "../../assets/img/PlasticPollution.jpg";
import CleanUp from "../../assets/img/CleanUp.jpg";
import EndangeredSpecies from "../../assets/img/EndangeredSpecies.jpg";
import Education from "../../assets/img/Education.jpg";
import QnaData from "./QnaData";

function Quiz() {
  const [step, setStep] = useState("landing"); // 'landing', 'question', 'result'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setStep("question");
  };

  const handleAnswer = (answer) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: answer,
    });

    if (answer === QnaData.questionsData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < QnaData.questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("result");
    }
  };

  const restartQuiz = () => {
    setStep("landing");
    setCurrentQuestion(0);
    setUserAnswers({});
    setScore(0);
  };

  if (step === "landing") {
    return (
      <>
        <div className="landing-page">
          <Container>
            <Row className="align-items-center">
              <Col md="6">
                <h1 className="feature-title">
                  How much do you know about Reptiles?
                </h1>
                <p className="feature-description">
                  Let's test your knowledge and see how much you really know
                  about reptiles and their habitats!
                </p>
                <Button
                  onClick={startQuiz}
                  className="dark-blue-button cta-button"
                >
                  Take Quiz
                </Button>
              </Col>
              <Col md="6">
                <img src={SeaTurtle} alt="Sea Turtle" className="img-fluid" />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }

  if (step === "question") {
    const question = QnaData.questionsData[currentQuestion];
    return (
      <div className="question-page">
        <h2>{question.question}</h2>
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            className="d-block w-100 mb-3"
          >
            {option}
          </Button>
        ))}
      </div>
    );
  }

  if (step === "result") {
    return (
      <div className="result-page">
        <h2>
          You scored {score}/{QnaData.questionsData.length}!
        </h2>
        <Button onClick={restartQuiz} color="primary">
          Let's go again
        </Button>
      </div>
    );
  }

  return null;
}

export default Quiz;
