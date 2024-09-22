"use client";

const Results = ({
  score,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  percentage,
  timeSpent,
  averageTimePerQuestion, // New prop for average time per question
}) => (
  <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
    <h2 className="text-3xl font-bold mb-4 text-center">Quiz Results</h2>
    <div className="text-lg space-y-2">
      <p className="font-semibold">Points Earned: <span className="font-normal">{score}</span></p>
      <p className="font-semibold">Correct Answers: <span className="font-normal">{correctAnswers}</span></p>
      <p className="font-semibold">Wrong Answers: <span className="font-normal">{wrongAnswers}</span></p>
      <p className="font-semibold">Percentage: <span className="font-normal">{percentage}%</span></p>
      <p className="font-semibold">Total Time Spent: <span className="font-normal">{timeSpent}s</span></p>
      <p className="font-semibold">Time Per Question: <span className="font-normal">{averageTimePerQuestion}s</span></p>
    </div>
  </div>
);

export default Results;
