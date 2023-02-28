import { useState, useEffect } from 'react';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [strokeDasharray, setStrokeDasharray] = useState(0);
  const [strokeDashoffset, setStrokeDashoffset] = useState(0);

  useEffect(() => {
    const newAudio = new Audio(src);
    newAudio.onloadedmetadata = () => {
      setDuration(newAudio.duration);
    };
    setAudio(newAudio);
  }, [src]);

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
        setCurrentTime(0);
        setStrokeDasharray(0);
        setStrokeDashoffset(0);
      }
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    if (audio && isPlaying) {
      const animationInterval = setInterval(() => {
        setCurrentTime(currentTime => {
          const newCurrentTime = currentTime + 0.01;
          if (newCurrentTime >= duration) {
            setIsPlaying(false);
          }
          return newCurrentTime;
        });
      }, 10);

      const fillInterval = setInterval(() => {
        const progress = currentTime / duration;
        const squareSize = 50;
        const perimeter = 2 * (squareSize + squareSize * Math.sqrt(2));
        const filledPerimeter = progress * perimeter;
        setStrokeDasharray(filledPerimeter + ' ' + perimeter);
        setStrokeDashoffset((1 - progress) * perimeter);
      }, 10);

      return () => {
        clearInterval(animationInterval);
        clearInterval(fillInterval);
      };
    }
  }, [audio, isPlaying, currentTime, duration]);

  return (
    <>
      <svg width="100" height="100">
        <rect
          x={0}
          y={0}
          width={50}
          height={50}
          fill="black"
          stroke="none"
          strokeWidth="0"
        />
        <rect
          x={0}
          y={0}
          width={50}
          height={50}
          fill="none"
          stroke="white"
          strokeWidth="5"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(45 25 25)"
        />
      </svg>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </>
  );
};

export default AudioPlayer;



// import { useEffect, useState } from "react";

// function ItemList() {

//     const css = `
//     .active {
//         background-color: blue;
//     }
// `;


//     const items = [
//         {
//             name: "first"
//         },
//         {
//             name: "second"
//         },
//         {
//             name: "third"
//         },
//     ];

//     const [activeIndex, setActiveIndex] = useState(-1);
//     const [isActive, setActive] = useState(false);

//     const handleClick = (index) => {

//         if (index === activeIndex) {
//             setActiveIndex(-1);
//             setActive(true);
//         } else {
//             setActiveIndex(index);
//             setActive(false);

//         }
//     };

//     useEffect(() => {
//         console.log("i like it!!");
//     }, [isActive]);

//     return (
//         <>
//             <ul>
//                 {items.map((item, index) => (
//                     <li
//                         key={item + index}
//                         className={index === activeIndex ? 'active' : 'inactive'}
//                         onClick={() => handleClick(index)}
//                     >
//                         <button>
//                             {item.name}
//                         </button>
//                     </li>
//                 ))}
//             </ul>

//             <style>{css}</style>
//         </>
//     );
// };

// export default ItemList;
