import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { GiSeaTurtle } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import { Player } from "./Player";
import { Plastic } from "./Plastic";
import { Food } from "./Food";
import { Bubble } from "./Bubble";
import LandingPage from "./LandingPage";
import ModelDisplay from "./ModelDisplay";
import bgrdImg from "../../assets/img/minigame/minigameBackground.png";
import popupBgrdImg from "../../assets/img/minigame/warning.png";
import frameImg from "../../assets/img/minigame/frame.png";
import plasticImg from "../../assets/img/minigame/plastic.png";
import jellyfishImg from "../../assets/img/minigame/jellyfish.png";
import bubbleImg from "../../assets/img/minigame/bubble.png";
import upImg from "../../assets/img/minigame/up.png";
import downImg from "../../assets/img/minigame/down.png";
import seaTurtleImg from "../../assets/img/minigame/sea_turtle.png";
import axios from "axios";

import { Container, Row, Col, Card, CardBody, Tooltip } from "reactstrap";
// import { FactData } from "./MinigameFact";

function Game() {
  const [gameState, setGameState] = useState({
    state: "",
    difficulty: 0,
    difficultyLevel: "",
    stateName: "",
    highScore: 0,
    prevHighScore: 0,
  });
  const canvasRef = useRef(null); // Ref for canvas element
  const ctxRef = useRef(null); // Ref for canvas context
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 950, height: 550 });
  const lastItemSpawnAtRef = useRef(Date.now()); // Ref for last item spawn time
  const plasticsRef = useRef([]); // Use ref to persist plastics array across renders
  const foodsRef = useRef([]); // Use ref to persist foods array across renders
  const bubblesRef = useRef([]); // Use ref to persist bubbles array across renders
  const [step, setStep] = useState("landing");
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState(null); // Use state for the player instance
  const [isPaused, setIsPaused] = useState(false); // State for pause control
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [factArray, setFactArray] = useState([]);
  const [generalFactArray, setGeneralFactArray] = useState([]);
  const [selectedGeneralFact, setSelectedGeneralFact] = useState(null);

  const gameLoopRef = useRef(null); // Ref to store the game loop's requestAnimationFrame ID
  const [gameStateData, setGameStateData] = useState([]);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const turtleClassInfo = () => {
    return (
      <div className="custom-tooltip">
        <h3>Master (Top 10%)</h3>
        <p>
          A fully grown sea turtle, adept at surviving the ocean's challenges.
        </p>
        <h3>Guardian (Top 20%)</h3>
        <p>Protecting the seas with their knowledge and skills.</p>
        <h3>Explorer (Top 50%)</h3>
        <p>Gaining confidence, now exploring deeper waters.</p>
        <h3>Juvenile (Top 75%)</h3>
        <p>Growing stronger but still learning how to navigate the ocean.</p>
        <h3>Hatchling (Top 100%)</h3>
        <p>A baby sea turtle just starting its journey.</p>
      </div>
    );
  };

  const fetchStateData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/minigame/state_info"
      );
      setGameStateData(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const stateFactsArray = useMemo(() => {
    return factArray.filter((fact) => fact.state === gameState.state);
  }, [factArray, gameState.state]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const aspectRatio = 950 / 550;

        let newWidth, newHeight;

        if (containerWidth / containerHeight > aspectRatio) {
          newHeight = containerHeight;
          newWidth = newHeight * aspectRatio;
        } else {
          newWidth = containerWidth;
          newHeight = newWidth / aspectRatio;
        }

        setCanvasSize({ width: newWidth, height: newHeight });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Function to fetch and shuffle questions
  const fetchAndShuffleFacts = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/minigame/state_fact"
      );
      setFactArray(response.data);
    } catch (error) {
      console.error("Error fetching fact:", error);
    }
  };

  const fetchGeneralFact = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/minigame/general_fact"
      );
      setGeneralFactArray(response.data);
    } catch (error) {
      console.error("Error fetching general fact:", error);
    }
  };

  const updateHighScore = useCallback(async (state, score) => {
    try {
      const data = {
        state: state,
        score: score,
      };
      await axios.post("http://127.0.0.1:5000/api/minigame/updatescore", data);
    } catch (error) {
      console.error("Error updating high score:", error);
    }
  }, []);

  useEffect(() => {
    if (score > gameState.highScore) {
      updateHighScore(gameState.state, score).then(() => {
        if (gameState.prevHighScore === gameState.highScore) {
          gameState.prevHighScore = gameState.highScore;
        }
        gameState.highScore = score; // Update the gameState after updating the high score
      });
    }
  }, [score, gameState, updateHighScore]);

  // Function to load the content of the pop up message
  const loadContent = () => {
    if (stateFactsArray.length === 0) {
      return (
        <div>
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
            No Facts Available
          </h2>
          <p>There are no facts available for {gameState.stateName}.</p>
        </div>
      );
    }

    const randomIndex = Math.floor(Math.random() * stateFactsArray.length);
    const selectedFact = stateFactsArray[randomIndex];

    return (
      <div>
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
          {selectedFact.title}
        </h2>
        <p>{selectedFact.description}</p>
      </div>
    );
  };

  const randomNumber = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
    fetchStateData();

    // Set a random general fact when component mounts
    if (generalFactArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * generalFactArray.length);
      console.log(randomIndex);
      setSelectedGeneralFact(generalFactArray[randomIndex]);
    }
  }, [score, gameState, updateHighScore]);

  const loadGeneralFact = () => {
    if (!selectedGeneralFact) {
      return <p>No facts available</p>;
    }
    return (
      <div style={{ height: "150px", overflowY: "auto" }}>
        <h3 style={{ textAlign: "left" }}>
          <GiSeaTurtle size={40} /> Fun Fact
        </h3>
        <h5 style={{ textAlign: "left", color: "#003366" }}>
          <strong>{selectedGeneralFact.title}:</strong>
        </h5>
        <p style={{ textAlign: "left" }}>{selectedGeneralFact.description}</p>
        <p style={{ textAlign: "left" }}>
          <strong>Find out more: </strong>
          <a
            href={selectedGeneralFact.references}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            {selectedGeneralFact.references}
          </a>
        </p>
      </div>
    );
  };

  const classifyLevel = (percentage) => {
    if (percentage >= 0 && percentage <= 24) {
      return "Hatchling";
    } else if (percentage >= 25 && percentage <= 49) {
      return "Juvenile";
    } else if (percentage >= 50 && percentage <= 69) {
      return "Explorer";
    } else if (percentage >= 70 && percentage <= 89) {
      return "Guardian";
    } else if (percentage >= 90 && percentage <= 100) {
      return "Master";
    }
  };

  const initializeGame = (
    state,
    difficulty,
    difficultyLevel,
    stateName,
    highScore,
    prevHighScore
  ) => {
    setGameState({
      state,
      difficulty,
      difficultyLevel,
      stateName,
      highScore,
      prevHighScore,
    });
    setScore(0);
    setPlayer(new Player(5, 550 / 2, handleGameOver)); // Create a new player instance with default values
    plasticsRef.current = [];
    foodsRef.current = [];
    bubblesRef.current = [];
    setStep("game");
    setIsPaused(false); // Ensure the game starts unpaused
    setShowPopup(false); // Ensure the popup is hidden at the start
    lastItemSpawnAtRef.current = Date.now(); // Reset the item spawn time
  };

  const restartGame = () => {
    setStep("landing");
  };

  const handleGameOver = (finalScore) => {
    setScore(finalScore);
    setStep("conclusion");
  };

  const handleBubbleCollision = () => {
    setIsPaused(true);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setIsPaused(false);
    player.updateIspaused(false);
  };

  useEffect(() => {
    fetchStateData();
    fetchGeneralFact();
    fetchAndShuffleFacts();
    if (step !== "game") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx; // Store context in ref

    // Set canvas size
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Scale the context to maintain the aspect ratio
    const scaleX = canvasSize.width / 950;
    const scaleY = canvasSize.height / 550;
    ctx.scale(scaleX, scaleY);

    const fixedTimeStep = 1000 / 60; // 60 updates per second (16.67ms per update)
    let lastUpdate = performance.now();
    let accumulatedTime = 0;

    const gameLoop = (timestamp) => {
      if (step !== "game") return; // Exit the loop if the game is over
      if (!isPaused) {
        accumulatedTime += timestamp - lastUpdate;
        lastUpdate = timestamp;

        // Update game logic in fixed time steps
        while (accumulatedTime >= fixedTimeStep) {
          updateGameLogic(fixedTimeStep / 1000); // Convert to seconds
          accumulatedTime -= fixedTimeStep;
        }
      }
      // Render the current frame
      renderGame();
      // Request the next frame
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    const updateGameLogic = (deltaTime) => {
      if (step !== "game") return; // Prevent further updates if the game is over
      player.update(deltaTime); // Update player based on deltaTime

      // Value controls
      const plasticNumber = 2 * gameState.difficulty;
      const plasticSpawnX = 945;
      const plasticSpawnY = randomNumber(80, 550 - 90);
      const plasticSpeed = randomNumber(4, 6);
      const plasticSpawnIntervalTime = 350;

      const foodNumber = 2;
      const foodSpawnX = 945;
      const foodSpawnY = randomNumber(80, 550 - 90);
      const foodSpeed = 5;

      const bubbleNumber = 1;
      const bubbleSpawnX = 945;
      const bubbleSpawnY = randomNumber(80, 550 - 90);
      const bubbleSpeed = 5;

      // Logic to spawn the items
      if (
        plasticsRef.current.length < plasticNumber && // If currently less than 10 plastics
        Date.now() - lastItemSpawnAtRef.current > plasticSpawnIntervalTime // Last plastic spawn time is long enough
      ) {
        plasticsRef.current.push(
          new Plastic(plasticSpawnX, plasticSpawnY, plasticSpeed)
        );
        lastItemSpawnAtRef.current = Date.now(); // Update plastic spawn time
      }

      if (foodsRef.current.length < foodNumber && Math.random() < 0.05) {
        foodsRef.current.push(new Food(foodSpawnX, foodSpawnY, foodSpeed));
      }

      if (bubblesRef.current.length < bubbleNumber && Math.random() < 0.05) {
        const newBubble = new Bubble(bubbleSpawnX, bubbleSpawnY, bubbleSpeed);
        newBubble.onCollide = handleBubbleCollision; // Assign collision handler
        bubblesRef.current.push(newBubble);
      }

      // Update game items
      plasticsRef.current = plasticsRef.current.filter((item) => !item.dead);
      plasticsRef.current.forEach((plastic) => {
        plastic.update(player, deltaTime);
      });

      foodsRef.current = foodsRef.current.filter((item) => !item.dead);
      foodsRef.current.forEach((food) => {
        food.update(player, deltaTime);
      });

      bubblesRef.current = bubblesRef.current.filter((item) => !item.dead);
      bubblesRef.current.forEach((bubble) => {
        bubble.update(player, deltaTime);
      });
    };

    const renderGame = () => {
      if (step !== "game") return; // Prevent rendering if the game is over

      ctx.clearRect(0, 0, 950, 550); // Clear the canvas
      player.draw(ctx); // Draw player

      // Draw game items
      plasticsRef.current.forEach((plastic) => {
        plastic.draw(ctx);
      });

      foodsRef.current.forEach((food) => {
        food.draw(ctx);
      });

      bubblesRef.current.forEach((bubble) => {
        bubble.draw(ctx);
      });
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop); // Start the game loop

    // Clean up the effect to avoid multiple game loops
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current); // Cancel the game loop on unmount
      }
    };
  }, [step, player, isPaused, canvasSize, gameState.difficulty]); // Dependencies array includes 'isPaused' to trigger re-renders

  if (step === "landing") {
    return (
      <LandingPage onStartGame={initializeGame} gameStateData={gameStateData} />
    );
  }

  if (step === "game") {
    return (
      <div className="landing-page gametitle-section">
        <Container fluid>
          <Row className="content">
            <h2>You are currently in {gameState.state}'s ocean area!!! </h2>
            <p>
              Difficulty: <strong>{gameState.difficultyLevel}</strong>
            </p>
          </Row>
          <Row className="align-items-center">
            <Col md="7">
              <div
                ref={containerRef}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <canvas
                  ref={canvasRef}
                  id="myCanvas"
                  style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(${bgrdImg})`,
                    border: "2px solid #000000",
                    width: "100%",
                    height: "100%",
                    maxWidth: "950px",
                    maxHeight: "550px",
                  }}
                />
                {showPopup && (
                  <>
                    <div className="overlay">
                      <div
                        className="popup-window"
                        style={{
                          backgroundSize: "cover",
                          backgroundImage: `url(${popupBgrdImg})`,
                          backgroundColor: "transparent",
                          resizeMode: "stretch",
                        }}
                      >
                        <div className="popup-content">{loadContent()}</div>
                        <button onClick={closePopup}>Resume Game</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Col>
            <Col md="5" className="instruction-section">
              <div className="instruction-section">
                <img src={frameImg} alt="frame" />
                <div className="text-content">
                  <Row>
                    <Col md="5">
                      <img
                        src={upImg}
                        alt="Up"
                        style={{ height: "25px", width: "25px" }}
                      />
                    </Col>
                    <Col md="7">
                      <p>Move up</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5">
                      <img
                        src={downImg}
                        alt="Down"
                        style={{ height: "25px", width: "25px" }}
                      />
                    </Col>
                    <Col md="7">
                      <p>Move down</p>
                    </Col>
                    <Row>
                      <Col md="5">
                        <img
                          src={plasticImg}
                          alt="plastic"
                          style={{ height: "30px", width: "20px" }}
                        />
                      </Col>
                      <Col md="7">
                        <p>-10 HP</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="5">
                        <img
                          src={jellyfishImg}
                          alt="jellyfish"
                          style={{ height: "30px", width: "20px" }}
                        />
                      </Col>
                      <Col md="7">
                        <p>+5 PTS</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="5">
                        <img
                          src={bubbleImg}
                          alt="bubble"
                          style={{ height: "25px", width: "25px" }}
                        />
                      </Col>
                      <Col md="7">
                        <p>+10 PTS</p>
                      </Col>
                    </Row>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (step === "conclusion") {
    return (
      <div className="minigame-feedback">
        <div className="content">
          <Row>
            <Col md="7" style={{}}>
              {" "}
              <h1>Game Over</h1>
              <h3>
                Your Score: <strong>{score}</strong>
              </h3>
              <h3>
                In <strong>{gameState.stateName}</strong>
              </h3>
              {score < gameState.highScore ? (
                <>
                  <p>
                    You are just{" "}
                    <strong>{gameState.highScore - score} points </strong> away
                    from the top sea turtle!
                  </p>
                  <p>
                    You are{" "}
                    <strong>
                      {classifyLevel(
                        Math.round((score / gameState.highScore) * 100)
                      )}
                    </strong>{" "}
                    sea turtle{" "}
                    <strong>
                      (Top{" "}
                      {100 - Math.round((score / gameState.highScore) * 100)}%
                      score)
                    </strong>
                    <span
                      id="turtleClassInfo"
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                    >
                      <FaInfoCircle />
                    </span>
                    <Tooltip
                      isOpen={tooltipOpen}
                      target="turtleClassInfo"
                      toggle={toggle}
                      placement="right"
                      style={{ width: "200%" }}
                    >
                      {turtleClassInfo}
                    </Tooltip>
                  </p>
                  <ProgressBar
                    completed={Math.round((score / gameState.highScore) * 100)}
                    maxCompleted={100}
                    bgColor={"#5d8dff"} // completed
                    baseBgColor={"#a8caed"} // not completed
                    animateOnRender={true}
                    height={"35px"}
                    margin={"15px 0"}
                    customLabel={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={seaTurtleImg}
                          alt="Progress Icon"
                          style={{ height: "20px", marginRight: "8px" }}
                        />
                      </div>
                    }
                  />
                </>
              ) : (
                <>
                  <p>
                    You just broke the record with{" "}
                    <strong>{score - gameState.highScore} points </strong> more
                    from the previous top sea turtle!
                  </p>
                  <p>
                    <strong>CONGRATULATIONS!</strong> You are{" "}
                    <strong>TOP 1</strong> sea turtle now!!!{" "}
                    <span
                      id="turtleClassInfo"
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                    >
                      <FaInfoCircle />
                    </span>
                    <Tooltip
                      isOpen={tooltipOpen}
                      target="turtleClassInfo"
                      toggle={toggle}
                      placement="right"
                      style={{ width: "200%" }}
                    >
                      {turtleClassInfo}
                    </Tooltip>
                  </p>
                  <ProgressBar
                    completed={100}
                    maxCompleted={100}
                    bgColor={"#5d8dff"} // completed
                    baseBgColor={"#a8caed"} // not completed
                    animateOnRender={true}
                    height={"35px"}
                    margin={"15px 0"}
                    // customLabel={<GiSeaTurtle size={40} />} seaTurtleImg
                    customLabel={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={seaTurtleImg}
                          alt="Progress Icon"
                          style={{ height: "20px", marginRight: "8px" }}
                        />
                      </div>
                    }
                  />
                </>
              )}
            </Col>
            <Col md="5">
              {score < gameState.highScore ? (
                <ModelDisplay
                  className={classifyLevel(
                    Math.round((score / gameState.highScore) * 100)
                  )}
                />
              ) : (
                <ModelDisplay className={"Top1"} />
              )}
            </Col>
          </Row>
          <Row>
            <Card className="card-info ">
              <CardBody>
                {loadGeneralFact()}
                <div className="session-buttons">
                  <button className="option-buttons" onClick={restartGame}>
                    Play Again
                  </button>
                  <button className="option-buttons" onClick={restartGame}>
                    About Plastic Pollution
                  </button>
                </div>
              </CardBody>
            </Card>
          </Row>
        </div>
      </div>
    );
  }

  return null;
}

export default Game;
