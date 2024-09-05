import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "./Player";
import { Plastic } from "./Plastic";
import { Food } from "./Food";
import { Bubble } from "./Bubble";
import bgrdImg from "../../assets/img/minigame/minigameBackground.png"; // Load your sprite sheet

function Game() {
  const canvasRef = useRef(null); // Ref for canvas element
  const ctxRef = useRef(null); // Ref for canvas context
  const lastItemSpawnAtRef = useRef(Date.now()); // Ref for last item spawn time
  const plasticsRef = useRef([]); // Use ref to persist plastics array across renders
  const foodsRef = useRef([]); // Use ref to persist foods array across renders
  const bubblesRef = useRef([]); // Use ref to persist bubbles array across renders
  const [step, setStep] = useState("landing");
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState(null); // Use state for the player instance
  const navigate = useNavigate();
  const gameLoopRef = useRef(null); // Ref to store the game loop's requestAnimationFrame ID

  const randomNumber = (min, max) => Math.random() * (max - min) + min;

  const initializeGame = () => {
    // Reinitialize game state
    setScore(0);
    setPlayer(new Player(5, 550 / 2, handleGameOver)); // Create a new player instance with default values
    plasticsRef.current = [];
    foodsRef.current = [];
    bubblesRef.current = [];
    setStep("game");
  };

  const handleGameOver = (finalScore) => {
    setScore(finalScore);
    setStep("conclusion");
  };

  const startGame = () => {
    setStep("landing");
  };

  useEffect(() => {
    if (step !== "game") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx; // Store context in ref

    const fixedTimeStep = 1000 / 60; // 60 updates per second (16.67ms per update)
    let lastUpdate = performance.now();
    let accumulatedTime = 0;

    const gameLoop = (timestamp) => {
      if (step !== "game") return; // Exit the loop if the game is over

      accumulatedTime += timestamp - lastUpdate;
      lastUpdate = timestamp;

      // Update game logic in fixed time steps
      while (accumulatedTime >= fixedTimeStep) {
        updateGameLogic(fixedTimeStep / 1000); // Convert to seconds
        accumulatedTime -= fixedTimeStep;
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
      const plasticSpawnY = randomNumber(30, 550 - 100);
      const plasticSpeed = randomNumber(4, 8);
      const plasticSpawnIntervalTime = 350;

      const foodNumber = 1;
      const foodSpawnX = 945;
      const foodSpawnY = randomNumber(30, 550 - 100);
      const foodSpeed = 5;

      const bubbleNumber = 1;
      const bubbleSpawnX = 945;
      const bubbleSpawnY = randomNumber(30, 550 - 100);
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
        bubblesRef.current.push(
          new Bubble(bubbleSpawnX, bubbleSpawnY, bubbleSpeed)
        );
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
      plasticsRef.current = []; // Reset plastics array when the component unmounts
      foodsRef.current = []; // Reset foods array when the component unmounts
      bubblesRef.current = []; // Reset bubbles array when the component unmounts
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current); // Cancel the game loop on unmount
      }
    };
  }, [step, player]); // Dependencies array includes 'player' to avoid unnecessary re-renders

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "row",
          padding: "60px 0",
        }}
      >
        <canvas
          ref={canvasRef} // Attach the canvas ref here
          id="myCanvas"
          width="950"
          height="550"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${bgrdImg})`,
            border: "2px solid #000000",
            marginTop: "48px",
          }}
        />
      </div>
    );
  }

  if (step === "conclusion") {
    return (
      <div className="feedback-page">
        <h2>Game Over</h2>
        <p>Your Score: {score}</p>
        <button onClick={() => navigate("/")}>Go to Main Menu</button>
        <button onClick={startGame}>Play Again</button>
      </div>
    );
  }

  return null;
}

export default Game;
