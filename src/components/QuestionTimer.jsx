"use client";
import { useState, useEffect } from "react";

const QuestionTimer = ({ onTimeUp, setTimePerQuestion, isAnswered }) => {
  const [seconds, setSeconds] = useState(10); // 10 seconds for each question

  useEffect(() => {
    if (!isAnswered && seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds((prev) => prev - 1);
        setTimePerQuestion(10 - seconds); 
      }, 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0 && !isAnswered) {
      onTimeUp(); 
    }
  }, [seconds, isAnswered]);

  
  useEffect(() => {
    if (!isAnswered) setSeconds(10);
  }, [isAnswered]);

  return <div className="text-lg">Time Left: {seconds}s</div>;
};

export default QuestionTimer;
