import React, { useEffect, useRef } from "react";
import { Player } from "./Player";
import { Plastic } from "./Plastic";
import { Food } from "./Food";
import { SeaGrass } from "./SeaGrass";

function App() {
  const canvasRef = useRef(null); // Ref for canvas element
  const ctxRef = useRef(null); // Ref for canvas context
  const lastItemSpawnAtRef = useRef(Date.now()); // Ref for last item spawn time
  const plasticsRef = useRef([]); // Use ref to persist plastics array across renders

  // means plastic spawn at (945, random place of Y)
  const player = useRef(new Player(5, 550 / 2)).current; // Persist the player instance across renders
  const randomNumber = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx; // Store context in ref

    const gameLoop = () => {
      ctx.clearRect(0, 0, 950, 550); // card width and height as mentioned above

      player.update(); // allow user to move
      player.draw(ctx); // draw player (turtle out)

      const randomX = 945; // fix the x coord of spawner at 945
      const randomY = randomNumber(0, 550);
      const plasticSpawnIntervalTime = 350;

      if (
        plasticsRef.current.length < 1 && // if currently less than 10 plastics
        Date.now() - lastItemSpawnAtRef.current > plasticSpawnIntervalTime // last plastic spawn time is long enough
      ) {
        console.log("spawning plastic");
        plasticsRef.current.push(new Plastic(randomX, randomY));
        lastItemSpawnAtRef.current = Date.now(); // update plastic spawn time
      }

      plasticsRef.current = plasticsRef.current.filter((item) => !item.dead);
      plasticsRef.current.forEach((plastic) => {
        plastic.update(player);
        plastic.draw(ctx);
      });

      requestAnimationFrame(gameLoop);
    };

    gameLoop(); // Start the game loop

    // Clean up the effect to avoid multiple game loops
    return () => {
      plasticsRef.current = []; // Reset plastics array when the component unmounts
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
