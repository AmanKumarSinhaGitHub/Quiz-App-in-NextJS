"use client";

import { useEffect, useState } from "react";
import { usePoints } from "@/context/PointsContext";
import QuestionTimer from "@/components/QuestionTimer";
import Results from "@/components/Results";

const Quiz = ({ params }) => {
  const { subject } = params;
  const { points, setPoints } = usePoints();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unattemptedQuestions, setUnattemptedQuestions] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [timePerQuestion, setTimePerQuestion] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/data/questions.json");
      if (response.ok) {
        const data = await response.json();
        const subjectData = data.subjects.find(
          (s) => s.name.toLowerCase() === subject
        );
        setQuestions(subjectData ? subjectData.questions : []);
      } else {
        console.error("Failed to fetch questions");
      }
    };
    fetchQuestions();
  }, [subject]);

  const handleAnswer = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    // Track the time spent on this question
    setTotalTimeSpent(totalTimeSpent + timePerQuestion);

    if (option === questions[currentQuestionIndex].answer) {
      setPoints(points + 4); // 4 points for a correct answer
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimePerQuestion(0); // Reset the time for the next question
    } else {
      setShowResults(true);
    }
  };

  // When time is up
  const handleTimeUp = () => {
    setIsAnswered(true); // Consider the question unattempted if time runs out
    setUnattemptedQuestions(unattemptedQuestions + 1); // Increment the unattempted questions count
    handleNext(); // Automatically go to the next question
  };

  // Calculate the percentage score
  const percentage = Math.round((correctAnswers / questions.length) * 100);
  const averageTimePerQuestion = (totalTimeSpent / questions.length).toFixed(2);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {!showResults ? (
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <h3 className="text-xl font-semibold text-center mb-4">
            {questions[currentQuestionIndex]?.question}
          </h3>
          <QuestionTimer
            onTimeUp={handleTimeUp}
            setTimePerQuestion={setTimePerQuestion}
            isAnswered={isAnswered}
            resetTimer={currentQuestionIndex} 
          />

          <div className="mt-4 space-y-4">
            {questions[currentQuestionIndex]?.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 rounded-lg text-lg font-semibold transition duration-300 ${
                  isAnswered &&
                  option === questions[currentQuestionIndex].answer
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

          {isAnswered && (
            <button
              onClick={handleNext}
              className="mt-6 w-full p-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Next
            </button>
          )}
        </div>
      ) : (
        <Results
          score={points}
          totalQuestions={questions.length}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          unattemptedQuestions={unattemptedQuestions}
          percentage={percentage}
          timeSpent={totalTimeSpent}
          averageTimePerQuestion={averageTimePerQuestion}
        />
      )}
    </div>
  );
};

export default Quiz;
