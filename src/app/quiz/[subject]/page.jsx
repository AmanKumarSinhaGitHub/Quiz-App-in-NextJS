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
      console.log('Response:', response); // Log the response
      if (response.ok) {
        const data = await response.json();
        console.log('Data:', data); // Log the data
        const subjectData = data.subjects.find(s => s.name.toLowerCase() === subject);
        console.log('Subject Data:', subjectData); // Log the subject data
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
    <div className="p-4">
      {!showResults ? (
        <>
          <h2 className="text-2xl">{questions[currentQuestionIndex]?.question}</h2>
          <QuestionTimer onTimeUp={() => setIsAnswered(true)} />
          <div className="mt-4">
            {questions[currentQuestionIndex]?.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`p-2 m-2 rounded ${
                  isAnswered && option === questions[currentQuestionIndex].answer
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
