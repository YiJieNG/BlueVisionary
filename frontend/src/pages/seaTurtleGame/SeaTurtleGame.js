import React, { useEffect, useRef } from "react";
import { Player } from "./Player";
import { Plastic } from "./Plastic";
import { Food } from "./Food";
import { SeaGrass } from "./SeaGrass";
import bgrdImg from "../../assets/img/minigame/minigameBackground.png"; // Load your sprite sheet

function App() {
  const canvasRef = useRef(null); // Ref for canvas element
  const ctxRef = useRef(null); // Ref for canvas context
  const lastItemSpawnAtRef = useRef(Date.now()); // Ref for last item spawn time
  const plasticsRef = useRef([]); // Use ref to persist plastics array across renders
  const foodsRef = useRef([]); // Use ref to persist plastics array across renders

  // means plastic spawn at (945, random place of Y)
  const player = useRef(new Player(5, 550 / 2)).current; // Persist the player instance across renders
  const randomNumber = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx; // Store context in ref

    const fixedTimeStep = 1000 / 60; // 60 updates per second (16.67ms per update)
    let lastUpdate = performance.now();
    let accumulatedTime = 0;

    const gameLoop = (timestamp) => {
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
      requestAnimationFrame(gameLoop);
    };

    const updateGameLogic = (deltaTime) => {
      player.update(deltaTime); // Update player based on deltaTime

      // Value controls
      // Plastic
      // const plasticNumber = Math.floor(Math.random() * 5) + 1;
      const plasticNumber = 3;
      const plasticSpawnX = 945;
      const plasticSpawnY = randomNumber(30, 550 - 100);
      const plasticSpeed = randomNumber(1, 4);
      const plasticSpawnIntervalTime = 350;

      // Food
      const foodNumber = 1;
      const foodSpawnX = 945;
      const foodSpawnY = randomNumber(30, 550 - 100);
      const foodSpeed = 3;

      // Logic to spawn the items
      if (
        plasticsRef.current.length < plasticNumber && // if currently less than 10 plastics
        Date.now() - lastItemSpawnAtRef.current > plasticSpawnIntervalTime // last plastic spawn time is long enough
      ) {
        // console.log("plasticNumber:", plasticNumber);
        plasticsRef.current.push(
          new Plastic(plasticSpawnX, plasticSpawnY, plasticSpeed)
        );
        lastItemSpawnAtRef.current = Date.now(); // update plastic spawn time
      }

      if (foodsRef.current.length < foodNumber && Math.random() < 0.05) {
        foodsRef.current.push(new Food(foodSpawnX, foodSpawnY, foodSpeed));
      }
      // Seagrass (Educational information)

      // Update game items
      plasticsRef.current = plasticsRef.current.filter((item) => !item.dead);
      plasticsRef.current.forEach((plastic) => {
        plastic.update(player, deltaTime);
      });

      foodsRef.current = foodsRef.current.filter((item) => !item.dead);
      foodsRef.current.forEach((food) => {
        food.update(player, deltaTime);
      });
    };

    const renderGame = () => {
      ctx.clearRect(0, 0, 950, 550); // Clear the canvas
      player.draw(ctx); // Draw player

      // Draw game items
      plasticsRef.current.forEach((plastic) => {
        plastic.draw(ctx);
      });

      foodsRef.current.forEach((food) => {
        food.draw(ctx);
      });
    };

    requestAnimationFrame(gameLoop); // Start the game loop

    // Clean up the effect to avoid multiple game loops
    return () => {
      plasticsRef.current = []; // Reset plastics array when the component unmounts
      foodsRef.current = []; // Reset foods array when the component unmounts
      cancelAnimationFrame(gameLoop);
    };
  }, [player]); // Dependencies array includes 'player' to avoid unnecessary re-renders

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
          // background: "linear-gradient(45deg, #add8f3, #f4f9fb)",
          backgroundSize: "cover",
          backgroundImage: `url(${bgrdImg})`,
          border: "2px solid #000000",
          marginTop: "48px",
        }}
      />
    </div>
  );
}

export default App;
