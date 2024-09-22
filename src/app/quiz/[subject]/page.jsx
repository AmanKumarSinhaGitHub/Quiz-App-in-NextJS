'use client';
import { useState } from "react";
import { usePoints } from "@/context/PointsContext";
import QuestionTimer from "@/components/QuestionTimer";

const Quiz = () => {
  const { points, setPoints } = usePoints(); // Access points and setPoints from context
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentQuestion].answer) {
      setPoints(points + 4);  // Update points when correct answer
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  return (
    <div className="p-4">
      {!showResults ? (
        <>
          <h2 className="text-2xl">{questions[currentQuestion].question}</h2>
          <QuestionTimer onTimeUp={() => setIsAnswered(true)} />
          <div className="mt-4">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`p-2 m-2 rounded ${
                  isAnswered && option === questions[currentQuestion].answer
                    ? "bg-green-500"
                    : isAnswered && option === selectedOption
                    ? "bg-red-500"
                    : "bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-xl">Quiz Finished!</h2>
          <p>Your Score: {points}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
