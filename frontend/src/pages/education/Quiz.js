import { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import SeaTurtle from "../../assets/img/SeaTurtle.jpg";
import QnaData from "./QnaData";

function Quiz() {
  const [step, setStep] = useState("landing"); // 'landing', 'question', 'feedback', 'result'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const startQuiz = () => {
    setStep("question");
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: answer,
    });

    if (answer === QnaData.questionsData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Move to feedback step to show correct answer
    setStep("feedback");
  };

  const nextQuestion = () => {
    if (currentQuestion < QnaData.questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setStep("question");
    } else {
      setStep("result");
    }
  };

  const restartQuiz = () => {
    setStep("landing");
    setCurrentQuestion(0);
    setUserAnswers({});
    setScore(0);
    setSelectedAnswer("");
  };

  if (step === "landing") {
    return (
      <>
        <div className="landing-page">
          <Container fluid>
            <Row className="align-items-center">
              <Col md="6" className="content">
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
              <Col md="6" className="image-section">
                <img src={SeaTurtle} alt="Sea Turtle" />
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
        <div className="options-grid">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option)}
              className="option-button"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (step === "feedback") {
    const question = QnaData.questionsData[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    // Prepare data for the pie chart
    const pieData = {
      labels: question.options,
      datasets: [
        {
          label: "# of Votes",
          data: [
            question.option1,
            question.option2,
            question.option3,
            question.option4,
          ],
          backgroundColor: ["#eff9ff", "#36A2EB", "#185797", "#003366"],
          hoverBackgroundColor: ["#4BC0C0", "#4BC0C0", "#4BC0C0", "#4BC0C0"],
        },
      ],
    };
    return (
      <div className="feedback-page">
        <Container fluid>
          <Row className="align-items-center">
            <Col md="6" className="content">
              <h2>{isCorrect ? "Correct!" : "Incorrect!"}</h2>
              <p>
                The correct answer is: <strong>{question.correctAnswer}</strong>
              </p>
              <Button onClick={nextQuestion} className="dark-blue-button">
                {currentQuestion < QnaData.questionsData.length - 1
                  ? "Next Question"
                  : "See Results"}
              </Button>
            </Col>
            <Col md="6" className="chart-section">
              <Pie data={pieData} />
            </Col>
          </Row>
        </Container>
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
