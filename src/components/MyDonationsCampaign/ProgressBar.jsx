// import React from "react";

// const ProgressBar = ({ collected = 0, goal = 1 }) => {
//   const progress = goal ? Math.min((collected / goal) * 100, 100) : 0;

//   const getColor = () => {
//     if (progress < 50) return "bg-red-500";
//     if (progress < 80) return "bg-yellow-500";
//     return "bg-green-500";
//   };

//   if (goal === 0) {
//     return <p className="text-green-600 font-semibold">Completed</p>;
//   }

//   return (
//     <div className="space-y-1">
//       <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//         <div
//           className={`h-4 text-xs text-white text-center leading-4 rounded-full transition-all duration-500 ease-in-out ${getColor()}`}
//           style={{ width: `${progress}%` }}
//         >
//           {progress.toFixed(1)}%
//         </div>
//       </div>
//       <div className="text-sm text-gray-600">
//         ${collected.toFixed(2)} collected of ${goal}
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;



// import React from "react";

// const ProgressBar = ({ collected = 0, goal = 1 }) => {
//   // progress % হিসাব
//   const progress = goal > 0 ? Math.min((collected / goal) * 100, 100) : 100;

//   // রং নির্ধারণ (লাল, হলুদ, সবুজ)
//   const getColor = () => {
//     if (progress < 50) return "bg-red-500";
//     if (progress < 80) return "bg-yellow-500";
//     return "bg-green-500";
//   };

//   // goal 0 হলে "Completed" দেখাবে
//   if (goal === 0) {
//     return <p className="text-green-600 font-semibold">Completed</p>;
//   }

//   return (
//     <div className="space-y-1">
//       <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//         <div
//           className={`h-4 text-xs text-white text-center leading-4 rounded-full transition-all duration-500 ease-in-out ${getColor()}`}
//           style={{ width: `${progress}%` }}
//         >
//           {progress.toFixed(1)}%
//         </div>
//       </div>
//       <div className="text-sm text-gray-600">
//         ${collected.toFixed(2)} collected of ${goal.toFixed(2)}
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;


import React from "react";

const ProgressBar = ({ collected = 0, goal = 1 }) => {
  const collectedNum = Number(collected) || 0;
  const goalNum = Number(goal) || 1;

  const progress = Math.min((collectedNum / goalNum) * 100, 100);

  const getColor = () => {
    if (progress < 50) return "bg-red-500";
    if (progress < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const isComplete = goalNum === 0 || collectedNum >= goalNum;

  if (isComplete) {
    return <p className="text-green-600 font-semibold">Completed</p>;
  }

  return (
    <div className="space-y-1">
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-4 text-xs text-white text-center leading-4 rounded-full transition-all duration-500 ease-in-out ${getColor()}`}
          style={{ width: `${progress}%` }}
        >
          {progress.toFixed(1)}%
        </div>
      </div>
      <div className="text-sm text-gray-600">
        ${collectedNum.toFixed(2)} collected of ${goalNum.toFixed(2)}
      </div>
    </div>
  );
};

export default ProgressBar;

