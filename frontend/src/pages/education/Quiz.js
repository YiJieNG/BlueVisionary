import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import SeaTurtle from "../../assets/img/SeaTurtle.jpg";
import axios from "axios";

function Quiz() {
  const [step, setStep] = useState("landing"); // 'landing', 'question', 'feedback', 'result'
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // Fetch questions from backend on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/questions");
        const formattedQuestions = response.data.map((q) => ({
          ...q,
          options: [q.option1, q.option2, q.option3, q.option4],
        }));
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [currentQuestion]);

  const startQuiz = () => {
    setStep("question");
  };

  const handleAnswer = async (answer, optionIndex) => {
    setSelectedAnswer(answer);

    // Record the user's answer
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: answer,
    });

    // Update the score if the answer is correct
    if (answer === questions[currentQuestion].correctOption) {
      setScore(score + 1);
    }

    // Update the selected option count in the database
    await updateOptionCount(questions[currentQuestion].questionId, optionIndex);

    // Move to feedback step to show correct answer
    setStep("feedback");
  };

  const updateOptionCount = async (questionId, optionIndex) => {
    try {
      // Construct the data to send
      const data = {
        questionId: questionId,
        optionIndex: optionIndex,
      };

      console.log(data);

      // Send the data to the backend using POST request
      await axios.post("http://localhost:5000/api/update_option_count", data);
    } catch (error) {
      console.error("Error updating option count:", error);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
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
    if (questions.length === 0) {
      return <div>Loading...</div>; // Show a loading state while questionsData is being fetched
    }
    const question = questions[currentQuestion];
    return (
      <div className="question-page">
        <h2>{question.questionText}</h2>
        <div className="options-grid">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option, index)}
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
    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctOption;
    // Prepare data for the pie chart
    const pieData = {
      labels: [
        question.option1,
        question.option2,
        question.option3,
        question.option4,
      ],
      datasets: [
        {
          label: "# of Votes",
          data: [
            question.option1Count,
            question.option2Count,
            question.option3Count,
            question.option4Count,
          ],
          backgroundColor: ["#eff9ff", "#36A2EB", "#185797", "#003366"],
          hoverBackgroundColor: ["#4BC0C0", "#4BC0C0", "#4BC0C0", "#4BC0C0"],
          hoverOffset: 5,
          borderWidth: 3,
        },
      ],
    };
    const pieOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            font: {
              size: 18,
            },
          },
        },
        title: {
          display: true,
          text: "How others say:",
          font: {
            size: 20,
          },
          color: "#003366",
        },
      },
    };
    return (
      <div className="feedback-page">
        <Container>
          <Row className="align-items-center">
            <Col md="6" className="content">
              <h2>{isCorrect ? "Correct!" : "Incorrect :("}</h2>
              <p>
                The correct answer is: <strong>{question.correctOption}</strong>
              </p>
              <p>
                <subtitle>Explaination: </subtitle>
                {question.explanation}
              </p>
              <Button onClick={nextQuestion} className="dark-blue-button">
                {currentQuestion < questions.length - 1
                  ? "Next Question"
                  : "See Results"}
              </Button>
            </Col>
            <Col md="6" className="chart-section">
              <Pie data={pieData} options={pieOptions} />
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
          You scored {score}/{questions.length}!
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
