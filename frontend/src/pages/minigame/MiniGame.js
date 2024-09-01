import React, { useState, useEffect } from "react";
import "./MiniGame.css";

const MiniGame = () => {
  const [health, setHealth] = useState(100);
  const [hunger, setHunger] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [turtlePosition, setTurtlePosition] = useState({ x: 10, y: 50 });
  const [plasticDebris, setPlasticDebris] = useState([]);
  const [foodItems, setFoodItems] = useState([]); // New state for food

  const itemSize = 1; // size of the turtle, food, and debris

  // Utility function to generate a random y position aligned to the nearest 10%
  const generateRandomYPosition = () => {
    const base = Math.floor(Math.random() * 10) * 10; // Random multiple of 10
    return base;
  };

  // Spawn plastic debris randomly from the right side of the screen
  useEffect(() => {
    const spawnPlastic = () => {
      setPlasticDebris((prev) => [
        ...prev,
        {
          x: 100,
          y: generateRandomYPosition(), // Use the utility function for y position
          speed: Math.random() * 2 + 1,
        },
      ]);
    };
    const interval = setInterval(spawnPlastic, 2000);
    return () => clearInterval(interval);
  }, []);

  // Spawn food items randomly from the right side of the screen
  useEffect(() => {
    const spawnFood = () => {
      setFoodItems((prev) => [
        ...prev,
        {
          x: 100,
          y: generateRandomYPosition(), // Use the utility function for y position
          speed: Math.random() * 1.5 + 0.5,
        },
      ]);
    };
    const interval = setInterval(spawnFood, 3000);
    return () => clearInterval(interval);
  }, []);

  // Update hunger over time
  useEffect(() => {
    const interval = setInterval(() => {
      if (health > 0 && hunger > 0) {
        setHunger((prev) => Math.max(prev - 1, 0));
      } else {
        setIsGameOver(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [health, hunger]);

  // Handle turtle movement with arrow keys (up and down only)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isGameOver) {
        let newY = turtlePosition.y;

        if (e.key === "ArrowUp") newY = Math.max(newY - 10, 0);
        if (e.key === "ArrowDown") newY = Math.min(newY + 10, 100);

        setTurtlePosition({ x: 10, y: newY });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [turtlePosition, isGameOver]);

  // Move debris and food from right to left and check for collisions
  useEffect(() => {
    const moveItems = () => {
      if (!isGameOver) {
        setPlasticDebris((prev) =>
          prev
            .map((debris) => ({
              ...debris,
              x: debris.x - debris.speed,
            }))
            .filter((debris) => debris.x > 0)
        );

        setFoodItems((prev) =>
          prev
            .map((food) => ({
              ...food,
              x: food.x - food.speed,
            }))
            .filter((food) => food.x > 0)
        );

        // Check for collisions with plastic debris
        setPlasticDebris((prevDebris) => {
          return prevDebris.filter((debris) => {
            const isCollision = checkCollision(
              debris,
              turtlePosition,
              itemSize
            );
            if (isCollision) {
              setHealth((prev) => Math.max(prev - 10, 0));
              return false; // Remove debris after collision
            }
            return true;
          });
        });

        // Check for collisions with food items
        setFoodItems((prevFood) => {
          return prevFood.filter((food) => {
            const isCollision = checkCollision(food, turtlePosition, itemSize);
            if (isCollision) {
              setHealth((prev) => Math.min(prev + 20, 100)); // Restore health when food is collected
              setHunger((prev) => Math.min(prev + 10, 100)); // Restore hunger
              return false; // Remove food after collision
            }
            return true;
          });
        });

        if (health <= 0) {
          setIsGameOver(true);
        }
      }
    };

    const interval = setInterval(moveItems, 100);
    return () => clearInterval(interval);
  }, [turtlePosition, plasticDebris, foodItems, isGameOver, health]);

  // Collision detection function
  const checkCollision = (item, turtle, size) => {
    const dx = item.x - turtle.x;
    const dy = item.y - turtle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < size; // collision if distance is less than size
  };

  return (
    <div className="minigame-container">
      <div className="stats">
        <p>Health: {health}</p>
        <p>Hunger: {hunger}</p>
      </div>
      <div className="game-area">
        {isGameOver ? (
          <h1>Game Over</h1>
        ) : (
          <>
            <div
              className="turtle"
              style={{
                top: `${turtlePosition.y}%`,
                left: `${turtlePosition.x}%`,
              }}
            ></div>
            <div className="debris-container">
              {plasticDebris.map((debris, index) => (
                <div
                  key={index}
                  className="debris"
                  style={{ top: `${debris.y}%`, left: `${debris.x}%` }}
                ></div>
              ))}
            </div>
            <div className="food-container">
              {foodItems.map((food, index) => (
                <div
                  key={index}
                  className="food"
                  style={{ top: `${food.y}%`, left: `${food.x}%` }}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MiniGame;
