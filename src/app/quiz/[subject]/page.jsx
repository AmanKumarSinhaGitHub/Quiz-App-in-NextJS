'use client';

import { useEffect, useState } from "react";
import { usePoints } from "@/context/PointsContext";
import QuestionTimer from "@/components/QuestionTimer";

const Quiz = ({ params }) => {
  const { subject } = params; // Get the subject from the URL parameters
  const { points, setPoints } = usePoints();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Fetch questions based on the subject
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/data/questions.json');
      if (response.ok) {
        const data = await response.json();
        const subjectData = data.subjects.find(s => s.name.toLowerCase() === subject);
        setQuestions(subjectData ? subjectData.questions : []);
      } else {
        console.error('Failed to fetch questions');
      }
    };
    fetchQuestions();
  }, [subject]);

  // Handle answer selection
  const handleAnswer = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    // Update points if the answer is correct
    if (option === questions[currentQuestionIndex].answer) {
      setPoints(points + 4);  // 4 points for a correct answer
    }

    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {!showResults ? (
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-4">{questions[currentQuestionIndex]?.question}</h2>
          <QuestionTimer onTimeUp={() => setIsAnswered(true)} />
          <div className="mt-4 space-y-4">
            {questions[currentQuestionIndex]?.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 rounded-lg text-lg font-semibold transition duration-300 ${
                  isAnswered && option === questions[currentQuestionIndex].answer
                    ? "bg-green-500 text-white"
                    : isAnswered && option === selectedOption
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Quiz Finished!</h2>
          <p className="text-lg">Your Score: {points}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
