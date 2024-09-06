import React, { useState, useEffect, useRef } from "react";
import { Player } from "./Player";
import { Plastic } from "./Plastic";
import { Food } from "./Food";
import { Bubble } from "./Bubble";
import bgrdImg from "../../assets/img/minigame/minigameBackground.png";
import popupBgrdImg from "../../assets/img/minigame/warning.png";
import frameImg from "../../assets/img/minigame/frame.png";
import plasticImg from "../../assets/img/minigame/plastic.png";
import jellyfishImg from "../../assets/img/minigame/jellyfish.png";
import bubbleImg from "../../assets/img/minigame/bubble.png";
import upImg from "../../assets/img/minigame/up.png";
import downImg from "../../assets/img/minigame/down.png";

import { Container, Row, Col } from "reactstrap";
import { FactData } from "./MinigameFact";

function Game() {
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

  const gameLoopRef = useRef(null); // Ref to store the game loop's requestAnimationFrame ID
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
      const response = FactData.factsData;
      setFactArray(response);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Function to load the content of the pop up message
  const loadContent = () => {
    const randomizeIndex = Math.floor(randomNumber(0, factArray.length));
    // const randomizeIndex = 0;

    return (
      <div>
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
          {factArray[randomizeIndex].title}
        </h2>
        <p>{factArray[randomizeIndex].description}</p>
      </div>
    );
  };

  const randomNumber = (min, max) => Math.random() * (max - min) + min;

  const initializeGame = () => {
    // Reinitialize game state only on game start, not on resume
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
      const plasticNumber = 3;
      const plasticSpawnX = 945;
      const plasticSpawnY = randomNumber(80, 550 - 90);
      const plasticSpeed = randomNumber(4, 6);
      const plasticSpawnIntervalTime = 350;

      const foodNumber = 1;
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
  }, [step, player, isPaused, canvasSize]); // Dependencies array includes 'isPaused' to trigger re-renders

  if (step === "landing") {
    return (
      <div className="landing-page">
        <h1>Welcome to the Sea Turtle Game!</h1>
        <button onClick={initializeGame}>Start Game</button>
      </div>
    );
  }

  if (step === "game") {
    return (
      <div className="landing-page gametitle-section">
        <Container fluid>
          <Row className="content">
            <h2>You are currently in VIC's ocean area!!! </h2>
            <p>
              Difficulty: <strong>HIGH</strong>
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
      <div className="feedback-page">
        <h2>Game Over</h2>
        <p>Your Score: {score}</p>
        <p>You are TOP 5% sea turtle in VIC!!!</p>
        <button onClick={initializeGame}>Play Again</button>
      </div>
    );
  }

  return null;
}

export default Game;
