import React, { useEffect, useRef, useState } from "react";
import spriteSheet from "../../assets/img/minigame/turtle_sprite.png";

const AnimatedTurtle = ({ height = 40, width = 40 }) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const numberOfFrames = 6; // Total frames in the sprite sheet
  const spriteWidth = 48; // Width of each frame
  const spriteHeight = 48; // Height of each frame
  const ticksPerFrame = 5; // Controls speed of animation
  const [tickCount, setTickCount] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.src = spriteSheet; // Load the sprite sheet

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawFrame = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Draw the current frame
      ctx.drawImage(
        image,
        frameIndex * spriteWidth, // The X position of the frame on the sprite sheet
        0, // Y position remains 0 assuming one row of sprites
        spriteWidth,
        spriteHeight,
        0,
        0,
        width, // Desired width on the canvas
        height // Desired height on the canvas
      );
    };

    const updateFrame = () => {
      setTickCount((prev) => prev + 1);
      if (tickCount > ticksPerFrame) {
        setTickCount(0);
        setFrameIndex((prev) => (prev + 1) % numberOfFrames);
      }
    };

    const animationId = requestAnimationFrame(() => {
      updateFrame();
      drawFrame();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [frameIndex, tickCount, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default AnimatedTurtle;
