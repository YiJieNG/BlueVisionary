import React, { useEffect, useRef } from "react";
import { Player } from "./Player";
import { Plastic } from "./Plastic";
import { Food } from "./Food";
import { SeaGrass } from "./SeaGrass";
import bgrdImg from "../../assets/img/minigame/minigameBackground.png"; // Load your background image

function App() {
  const canvasRef = useRef(null); // Ref for canvas element
  const ctxRef = useRef(null); // Ref for canvas context
  const lastItemSpawnAtRef = useRef(Date.now()); // Ref for last item spawn time
  const plasticsRef = useRef([]); // Use ref to persist plastics array across renders
  const foodsRef = useRef([]); // Use ref to persist foods array across renders

  const player = useRef(new Player(5, 550 / 2)).current; // Persist the player instance across renders
  const randomNumber = (min, max) => Math.random() * (max - min) + min;

  let lastTime = performance.now(); // Track the time of the last frame

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx; // Store context in ref

    const gameLoop = () => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTime) / 1000; // Time difference in seconds
      lastTime = currentTime;

      ctx.clearRect(0, 0, 950, 550); // Clear the canvas

      player.update(deltaTime); // Update player based on deltaTime
      player.draw(ctx); // Draw player

      // Value controls
      // Plastic
      const plasticNumber = 3;
      const plasticSpawnX = 945;
      const plasticSpawnY = randomNumber(30, 550 - 100);
      const plasticSpeed = randomNumber(1, 1.5);

      // Food
      const foodNumber = 1;
      const foodSpawnX = 945;
      const foodSpawnY = randomNumber(30, 550 - 100);
      const foodSpeed = 1;

      // Logic to spawn the items
      // Plastic
      if (
        plasticsRef.current.length < plasticNumber && // if currently less than the desired number of plastics
        Date.now() - lastItemSpawnAtRef.current > 350 // last plastic spawn time is long enough
      ) {
        plasticsRef.current.push(
          new Plastic(plasticSpawnX, plasticSpawnY, plasticSpeed)
        );
        lastItemSpawnAtRef.current = Date.now(); // update plastic spawn time
      }

      // Food
      if (foodsRef.current.length < foodNumber && Math.random() < 0.05) {
        foodsRef.current.push(new Food(foodSpawnX, foodSpawnY, foodSpeed));
      }

      // Game update logic for all the items
      // Plastic
      plasticsRef.current = plasticsRef.current.filter((item) => !item.dead);
      plasticsRef.current.forEach((plastic) => {
        plastic.update(player, deltaTime); // Update each plastic based on deltaTime
        plastic.draw(ctx); // Draw each plastic
      });

      // Food
      foodsRef.current = foodsRef.current.filter((item) => !item.dead);
      foodsRef.current.forEach((food) => {
        food.update(player, deltaTime); // Update each food item based on deltaTime
        food.draw(ctx); // Draw each food item
      });

      // Request the next frame
      requestAnimationFrame(gameLoop);
    };

    gameLoop(); // Start the game loop

    // Clean up the effect to avoid multiple game loops
    return () => {
      plasticsRef.current = []; // Reset plastics array when the component unmounts
      foodsRef.current = []; // Reset foods array when the component unmounts
      cancelAnimationFrame(gameLoop); // Cancel the animation frame
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
