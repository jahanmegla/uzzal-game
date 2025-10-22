import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PuzzlePhoto() {
  const [size, setSize] = useState(3);
  const [tiles, setTiles] = useState([]);
  const [isWin, setIsWin] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const image = "https://i.postimg.cc/xdmq1xrq/565716568-1332671055013939-6232931157346056696-n.jpg";

  // Responsive confetti sizing
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset when grid size changes
  useEffect(() => {
    resetPuzzle();
  }, [size]);

  const resetPuzzle = () => {
    const arr = Array.from({ length: size * size }, (_, i) => i);
    const shuffled = arr.sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    setIsWin(false);
  };

  const handleClick = (index) => {
    const emptyIndex = tiles.indexOf(size * size - 1);
    const newTiles = [...tiles];

    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - size,
      emptyIndex + size,
    ];

    if (validMoves.includes(index)) {
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);

      const solved = newTiles.every((v, i) => v === i);
      if (solved && !isWin) {
        setIsWin(true);
        toast.success("🎉 You solved the puzzle!", {
          position: "top-center",
          autoClose: 2500,
        });
      }
    }
  };

  // Dynamic tile size based on screen width
  const containerSize = Math.min(window.innerWidth * 0.9, 400);
  const tileSize = containerSize / size;

  return (
    <div className="flex flex-col items-center mt-2 px-2 select-none">
     

      {isWin && <Confetti width={windowSize.width} height={windowSize.height} />}

      {/* Grid size dropdown */}
      <div className="mb-3">
        <label className="mr-2 font-semibold text-sm md:text-base">
          Grid Size:
        </label>
        <select
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="border px-2 py-1 rounded text-sm md:text-base"
        >
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
        </select>
      </div>

      {/* Puzzle grid */}
      <div
        className="grid gap-1 rounded-lg shadow-md bg-white p-1"
        style={{
          gridTemplateColumns: `repeat(${size}, ${tileSize}px)`,
          gridTemplateRows: `repeat(${size}, ${tileSize}px)`,
        }}
      >
        {tiles.map((num, index) => {
          if (num === size * size - 1)
            return (
              <div
                key={index}
                className="bg-gray-200 rounded"
                style={{ width: tileSize, height: tileSize }}
              ></div>
            );

          const x = (num % size) * -tileSize;
          const y = Math.floor(num / size) * -tileSize;

          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              style={{
                width: tileSize,
                height: tileSize,
                backgroundImage: `url(${image})`,
                backgroundSize: `${size * tileSize}px ${size * tileSize}px`,
                backgroundPosition: `${x}px ${y}px`,
                borderRadius: "0.25rem",
                border: "1px solid #fff",
                cursor: "pointer",
                transition: "transform 0.15s ease",
              }}
              className="active:scale-95"
            ></div>
          );
        })}
      </div>

      <button
        onClick={resetPuzzle}
        className="px-4 py-2 mt-6 mb-10 bg-blue-800 text-white rounded-lg hover:bg-green-600 text-sm md:text-base"

      >
        🔁 Shuffle Again
      </button>
             {/* <button className="btn btn-soft p-5 btn-success">Success</button> */}
      <ToastContainer />
      
    </div>
  );
}

export default PuzzlePhoto;