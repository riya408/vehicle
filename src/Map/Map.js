import React, { useState, useEffect } from "react";
import "./Map.css";

const numRows = 20;
const numCols = 20;
const cellSize = 20;

function Map() {
  const [snake, setSnake] = useState([{ row: 10, col: 10 }]);
  const [food, setFood] = useState({ row: 5, col: 5 });
  const [direction, setDirection] = useState("right");
  const [started, setStarted] = useState(false);
  const [vehicleName, setVehicleName] = useState("");
  const [speed, setSpeed] = useState(1);
  const [time, setTime] = useState(1000);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (started) {
      const gameLoop = setInterval(() => {
        moveSnake();
        checkCollision();
      }, time);

      return () => {
        clearInterval(gameLoop);
      };
    }
  }, [snake, started]);

  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    if (key === "arrowup" && direction !== "down") {
      setDirection("up");
    } else if (key === "arrowdown" && direction !== "up") {
      setDirection("down");
    } else if (key === "arrowleft" && direction !== "right") {
      setDirection("left");
    } else if (key === "arrowright" && direction !== "left") {
      setDirection("right");
    }
  };

  const handleStart = () => {
    if (vehicleName.trim() === "" || speed <= 0 || time <= 0) {
      alert("Please enter valid inputs for Vehicle Name, Speed, and Time.");
      return;
    }

    const distance = speed * time;
    const numVehicles = Math.ceil(distance / cellSize);
    const vehicles = Array.from({ length: numVehicles }).map((_, index) => {
      const position = index * Math.floor(numCols / numVehicles);
      return { row: Math.floor(numRows / 2), col: position };
    });

    setVehicles(vehicles);
    setStarted(true);
  };
  
  
  const moveSnake = () => {
    const head = { ...snake[0] };
    const foodRow = food.row;
    const foodCol = food.col;
  
    // Calculate the distance between the snake's head and the food
    const rowDistance = foodRow - head.row;
    const colDistance = foodCol - head.col;
  
    // Determine the direction to move towards the food
    let newDirection;
    if (Math.abs(rowDistance) >= Math.abs(colDistance)) {
      newDirection = rowDistance > 0 ? "down" : "up";
    } else {
      newDirection = colDistance > 0 ? "right" : "left";
    }
  
    // Update the snake's direction
    setDirection(newDirection);
  
    // Update the position of the snake's head based on the new direction
    switch (newDirection) {
      case "up":
        head.row -= 1;
        break;
      case "down":
        head.row += 1;
        break;
      case "left":
        head.col -= 1;
        break;
      case "right":
        head.col += 1;
        break;
      default:
        break;
    }
  
    setSnake([head]);
  };
  
  const moveFood = () => {
    const currentFood = { ...food };
    const snakeHead = snake[0];
    const snakeDirection = calculateDirection(snakeHead, currentFood);
  
    switch (snakeDirection) {
      case "up":
        currentFood.row -= 1;
        break;
      case "down":
        currentFood.row += 1;
        break;
      case "left":
        currentFood.col -= 1;
        break;
      case "right":
        currentFood.col += 1;
        break;
      default:
        break;
    }
  
    setFood(currentFood);
  };
  
  const calculateDirection = (start, end) => {
    const rowDistance = end.row - start.row;
    const colDistance = end.col - start.col;
  
    if (Math.abs(rowDistance) >= Math.abs(colDistance)) {
      return rowDistance > 0 ? "down" : "up";
    } else {
      return colDistance > 0 ? "right" : "left";
    }
  };
  
  
 
  

  useEffect(() => {
    if (started) {
      const gameLoop = setInterval(() => {
        moveSnake();
        moveFood();
        checkCollision();
      }, time);
  
      return () => {
        clearInterval(gameLoop);
      };
    }
  }, [snake, started]);
  const checkCollision = () => {
    const head = snake[0];
    const { row, col } = head;
  
    // Check collision with walls
    if (row < 0 || row >= numRows || col < 0 || col >= numCols) {
      endGame();
      return;
    }
  
    // Check collision with snake's body
    const snakeBody = snake.slice(1);
    if (snakeBody.some((segment) => segment.row === row && segment.col === col)) {
      endGame();
      return;
    }
  };
  
  const endGame = () => {
    setStarted(false);
    setSnake([{ row: 10, col: 10 }]);
    setFood({ row: 5, col: 5 });
    setDirection("right");
    setVehicleName("");
    setSpeed(1);
    setTime(1000);
    setVehicles([]);
  };
  const handleStop = () => {
    setStarted(false);
  };
  
  

  return (
    <div
      className="snake-game"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      style={{
        gridTemplateRows: `repeat(${numRows}, ${cellSize}px)`,
        gridTemplateColumns: `repeat(${numCols}, ${cellSize}px)`,
      }}
    >
      <div>
      <div className="button-container">
          <button id="Newbtn" onClick={handleStart}>Start Simulation</button>
          <button id="Add" onClick={handleStop}>Stop Simulation</button>
      
        </div>
        {Array.from({ length: numRows }).map((_, rowIdx) => (
          <div key={rowIdx} className="row">
            {Array.from({ length: numCols }).map((_, colIdx) => {
              const isSnake = snake.some(
                (segment) => segment.row === rowIdx && segment.col === colIdx
              );
              const isFood = food.row === rowIdx && food.col === colIdx;
  
              const isVehicle = vehicles.some(
                (vehicle) => vehicle.row === rowIdx && vehicle.col === colIdx
              );
  
              return (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className={`cell ${isSnake ? "snake" : ""} ${
                    isFood ? "food" : ""
                  } ${isVehicle ? "vehicle" : ""}`}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
  
      {!started && (
        <div className="input-container">
          <input
            type="text"
            placeholder="Vehicle Name"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Speed"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(parseInt(e.target.value))}
          />
          
        </div>
      )}
    </div>
  );
      }
      export default Map;  