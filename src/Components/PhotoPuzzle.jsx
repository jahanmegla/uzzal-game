
// import React, { useEffect, useState } from "react";

// import Confetti from "react-confetti";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function PuzzlePhoto() {
//   const [size, setSize] = useState(3);
//   const [tiles, setTiles] = useState([]);
//   const [isWin, setIsWin] = useState(false);
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   const image =
//     "https://i.postimg.cc/xdmq1xrq/565716568-1332671055013939-6232931157346056696-n.jpg";

//   // Responsive confetti
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     resetPuzzle();
//   }, [size]);

//   // ✅ Generate solvable shuffle
//   const resetPuzzle = () => {
//     const arr = Array.from({ length: size * size }, (_, i) => i);
//     let shuffled;
//     do {
//       shuffled = [...arr].sort(() => Math.random() - 0.5);
//     } while (!isSolvable(shuffled));
//     setTiles(shuffled);
//     setIsWin(false);
//   };

//   // ✅ Check solvability
//   function isSolvable(puzzle) {
//     const len = puzzle.length;
//     const n = Math.sqrt(len);
//     const emptyIndex = puzzle.indexOf(len - 1);
//     const rowFromBottom = n - Math.floor(emptyIndex / n);

//     // count inversions
//     const inversions = puzzle.reduce((count, curr, i) => {
//       if (curr === len - 1) return count;
//       for (let j = i + 1; j < len; j++) {
//         if (puzzle[j] !== len - 1 && puzzle[i] > puzzle[j]) count++;
//       }
//       return count;
//     }, 0);

//     if (n % 2 !== 0) {
//       return inversions % 2 === 0;
//     } else {
//       return (
//         (rowFromBottom % 2 === 0 && inversions % 2 === 1) ||
//         (rowFromBottom % 2 === 1 && inversions % 2 === 0)
//       );
//     }
//   }

//   const handleClick = (index) => {
//     const emptyIndex = tiles.indexOf(size * size - 1);
//     const newTiles = [...tiles];

//     const validMoves = [
//       emptyIndex - 1,
//       emptyIndex + 1,
//       emptyIndex - size,
//       emptyIndex + size,
//     ];

//     if (validMoves.includes(index)) {
//       [newTiles[index], newTiles[emptyIndex]] = [
//         newTiles[emptyIndex],
//         newTiles[index],
//       ];
//       setTiles(newTiles);

//       const solved = newTiles.every((v, i) => v === i);
//       if (solved && !isWin) {
//         setIsWin(true);
//         toast.success("🎉 You solved the puzzle!", {
//           position: "top-center",
//           autoClose: 2500,
//         });
//       }
//     }
//   };

//   const containerSize = Math.min(window.innerWidth * 0.9, 400);
//   const tileSize = containerSize / size;

//   return (
//     <div className="flex flex-col items-center mt-2 px-2 select-none">
//       {isWin && (
//         <Confetti width={windowSize.width} height={windowSize.height} />
//       )}

//       {/* Grid size selector */}
//       <div className="mb-3">
//         <label className="mr-2 font-semibold text-sm md:text-base">
//           Grid Size:
//         </label>
//         <select
//           value={size}
//           onChange={(e) => setSize(parseInt(e.target.value))}
//           className="border px-2 py-1 rounded text-sm md:text-base"
//         >
//           <option value={3}>3x3</option>
//           <option value={4}>4x4</option>
//           <option value={5}>5x5</option>
//         </select>
//       </div>

//       {/* Puzzle grid */}
//       <div
//         className="grid gap-1 rounded-lg shadow-md bg-white p-1"
//         style={{
//           gridTemplateColumns: `repeat(${size}, ${tileSize}px)`,
//           gridTemplateRows: `repeat(${size}, ${tileSize}px)`,
//         }}
//       >
//         {tiles.map((num, index) => {
//           if (num === size * size - 1)
//             return (
//               <div
//                 key={index}
//                 className="bg-gray-200 rounded"
//                 style={{ width: tileSize, height: tileSize }}
//               ></div>
//             );

//           const x = (num % size) * -tileSize;
//           const y = Math.floor(num / size) * -tileSize;

//           return (
//             <div
//               key={index}
//               onClick={() => handleClick(index)}
//               style={{
//                 width: tileSize,
//                 height: tileSize,
//                 backgroundImage: `url(${image})`,
//                 backgroundSize: `${size * tileSize}px ${size * tileSize}px`,
//                 backgroundPosition: `${x}px ${y}px`,
//                 borderRadius: "0.25rem",
//                 border: "1px solid #fff",
//                 cursor: "pointer",
//                 transition: "transform 0.15s ease",
//               }}
//               className="active:scale-95"
//             ></div>
//           );
//         })}
//       </div>

//       <button
//         onClick={resetPuzzle}
//         className="px-4 py-2 mt-6 mb-10 bg-blue-800 text-white rounded-lg hover:bg-green-600 text-sm md:text-base"
//       >
//         🔁 Shuffle Again
//       </button>

//       <ToastContainer />
//     </div>
//   );
// }

// export default PuzzlePhoto;


import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PuzzlePhoto() {
  const [size, setSize] = useState(3);
  const [tiles, setTiles] = useState([]);
  const [isWin, setIsWin] = useState(false);
  const [showImage, setShowImage] = useState(false); // 👈 added
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const image =
    "https://i.postimg.cc/xdmq1xrq/565716568-1332671055013939-6232931157346056696-n.jpg";

  // Responsive confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    resetPuzzle();
  }, [size]);

  // ✅ Generate solvable shuffle
  const resetPuzzle = () => {
    const arr = Array.from({ length: size * size }, (_, i) => i);
    let shuffled;
    do {
      shuffled = [...arr].sort(() => Math.random() - 0.5);
    } while (!isSolvable(shuffled));
    setTiles(shuffled);
    setIsWin(false);
  };

  // ✅ Check solvability
  function isSolvable(puzzle) {
    const len = puzzle.length;
    const n = Math.sqrt(len);
    const emptyIndex = puzzle.indexOf(len - 1);
    const rowFromBottom = n - Math.floor(emptyIndex / n);

    // count inversions
    const inversions = puzzle.reduce((count, curr, i) => {
      if (curr === len - 1) return count;
      for (let j = i + 1; j < len; j++) {
        if (puzzle[j] !== len - 1 && puzzle[i] > puzzle[j]) count++;
      }
      return count;
    }, 0);

    if (n % 2 !== 0) {
      return inversions % 2 === 0;
    } else {
      return (
        (rowFromBottom % 2 === 0 && inversions % 2 === 1) ||
        (rowFromBottom % 2 === 1 && inversions % 2 === 0)
      );
    }
  }

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

  const containerSize = Math.min(window.innerWidth * 0.9, 400);
  const tileSize = containerSize / size;

  return (
    <div className="flex flex-col items-center mt-2 px-2 select-none">
      {isWin && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      {/* Grid size selector */}
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

      <div className="flex flex-col items-center gap-3 mt-6 mb-10">
        <button
          onClick={resetPuzzle}
          className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-green-600 text-sm md:text-base"
        >
          🔁 Shuffle Again
        </button>

        {/* 👇 New image toggle button */}
        <button
          onClick={() => setShowImage(!showImage)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-pink-600 text-sm md:text-base transition"
        >
          {showImage ? "🙈 Hide Full Image" : "👀 Show Full Image"}
        </button>

        {/* 👇 Full image preview */}
        {showImage && (
          <img
            src={image}
            alt="Full puzzle"
            className="rounded-xl shadow-lg border mt-2 transition-all duration-500 hover:scale-105"
            style={{
              width: Math.min(window.innerWidth * 0.9, 300),
              marginBottom: "10px",
            }}
          />
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default PuzzlePhoto;
