"use client";

import { useEffect, useState } from "react";
import { FaTrophy, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaPercentage, FaClock, FaStopwatch } from "react-icons/fa";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Results = ({
  score,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  unattemptedQuestions,
  percentage,
  timeSpent,
  averageTimePerQuestion,
}) => {
  // Set the state for confetti
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();

  // Disable confetti after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 7000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={700} />}

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Quiz Results
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        
        {/* Total Points */}
        <div className="p-5 bg-white shadow-md rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
          <div>
            <p className="text-xl font-semibold">Total Points</p>
            <p className="text-lg font-bold text-green-600">{score}</p>
          </div>
          <FaTrophy className="text-yellow-500 text-3xl" />
        </div>

        {/* Points Earned */}
        <div className="p-5 bg-white shadow-md rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
          <div>
            <p className="text-xl font-semibold">Points Earned</p>
            <p className="text-lg font-bold text-green-600">{correctAnswers * 4}</p>
          </div>
          <FaTrophy className="text-yellow-500 text-3xl" />
        </div>

        {/* Correct Answers */}
        <div className="p-5 bg-white shadow-md rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
          <div>
            <p className="text-xl font-semibold">Correct Answers</p>
            <p className="text-lg font-bold text-green-600">{correctAnswers}</p>
          </div>
          <FaCheckCircle className="text-green-500 text-3xl" />
        </div>

        {/* Wrong Answers */}
        <div className="p-5 bg-white shadow-md rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
          <div>
            <p className="text-xl font-semibold">Wrong Answers</p>
            <p className="text-lg font-bold text-red-600">{wrongAnswers}</p>
          </div>
          <FaTimesCircle className="text-red-500 text-3xl" />
        </div>

        {/* Unattempted Questions */}
        <div className="p-5 bg-white shadow-md rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
          <div>
            <p className="text-xl font-semibold">Unattempted Questions</p>
            <p className="text-lg font-bold text-yellow-600">{unattemptedQuestions}</p>
          </div>
          <FaQuestionCircle className="text-yellow-500 text-3xl" />
        </div>

        {/* Percentage */}
        <div className="p-5 bg-white shadow-md rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
          <div>
            <p className="text-xl font-semibold">Percentage</p>
            <p className="text-lg font-bold text-blue-600">{percentage}%</p>
          </div>
          <FaPercentage className="text-blue-500 text-3xl" />
        </div>

        {/* Total Time Spent */}
        <div className="p-5 bg-white shadow-md rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
          <div>
            <p className="text-xl font-semibold">Total Time Spent</p>
            <p className="text-lg font-bold text-purple-600">{timeSpent.toFixed(2)}s</p>
          </div>
          <FaClock className="text-purple-500 text-3xl" />
        </div>

        {/* Avg Time Per Question */}
        <div className="p-5 bg-white shadow-md rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
          <div>
            <p className="text-xl font-semibold">Avg Time/Question</p>
            <p className="text-lg font-bold text-indigo-600">{averageTimePerQuestion}s</p>
          </div>
          <FaStopwatch className="text-indigo-500 text-3xl" />
        </div>

        {/* Final Score */}
        <div className="p-5 bg-white shadow-md rounded-lg flex items-center justify-between col-span-1 md:col-span-3 text-center hover:shadow-lg transition-shadow duration-300">
          <p className="text-xl font-semibold w-full">
            You scored {correctAnswers * 4} out of {totalQuestions * 4} points!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
