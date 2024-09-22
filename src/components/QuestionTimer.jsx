"use client";
import { useState, useEffect } from 'react';

const QuestionTimer = ({ onTimeUp }) => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onTimeUp();
    }
  }, [seconds]);

  return <div className="text-lg">Time Left: {seconds}s</div>;
};

export default QuestionTimer;
