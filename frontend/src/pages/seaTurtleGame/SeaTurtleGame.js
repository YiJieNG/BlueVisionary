import React, { useEffect, useRef } from "react";
import { Player } from "./Player";
import { Plastic } from "./Plastic";
import { Food } from "./Food";
import { SeaGrass } from "./SeaGrass";

function App() {
  const canvasRef = useRef(null); // Ref for canvas element
  const ctxRef = useRef(null); // Ref for canvas context
  const lastItemSpawnAtRef = useRef(Date.now()); // Ref for last item spawn time

  const player = new Player(50, 550 / 2);
  const randomNumber = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx; // Store context in ref

    let plastics = [];
    let foods = [];
    let seaGrasses = [];

    const gameLoop = () => {
      ctx.clearRect(0, 0, 950, 550);

      player.update();
      player.draw(ctx);

      const randomX = randomNumber(700, 950);
      const randomY = randomNumber(0, 550);

      //   if (
      //     plastics.length < 10 &&
      //     Date.now() - lastItemSpawnAtRef.current > 1500
      //   ) {
      //     plastics.push(new Plastic(randomX, randomY));
      //     lastItemSpawnAtRef.current = Date.now();
      //   }

      //   console.log(plastics);

      if (foods.length < 1 && Math.random() < 0.05) {
        foods.push(new Food(randomX, randomY));
      }

      if (plastics.length < 5 && Math.random() < 0.05) {
        plastics.push(new Plastic(randomX, randomY));
      }

      //   if (seaGrasses.length < 1 && Math.random() < 0.02) {
      //     seaGrasses.push(new SeaGrass(randomX, randomY));
      //   }

      plastics = plastics.filter((item) => !item.dead);
      plastics.forEach((plastic) => {
        plastic.update(player);
        plastic.draw(ctx);
      });

      foods = foods.filter((item) => !item.dead);
      foods.forEach((food) => {
        food.update(player);
        food.draw(ctx);
      });

      // seaGrasses = seaGrasses.filter((item) => !item.dead);
      // seaGrasses.forEach((seaGrass) => {
      //   seaGrass.update(player);
      //   seaGrass.draw(ctx);
      // });

      requestAnimationFrame(gameLoop);
    };

    gameLoop(); // Start the game loop
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
          background: "linear-gradient(45deg, #add8f3, #f4f9fb)",
          backgroundSize: "cover",
          border: "2px solid #000000",
          marginTop: "48px",
        }}
      />
    </div>
  );
}

export default App;
