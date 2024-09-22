"use client";

const Results = ({
  score,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  percentage,
  timeSpent,
}) => (
  <div className="p-4">
    <h2 className="text-xl">Quiz Results</h2>
    <p>Points Earned: {score}</p>
    <p>Correct Answers: {correctAnswers}</p>
    <p>Wrong Answers: {wrongAnswers}</p>
    <p>Percentage: {percentage}%</p>
    <p>Total Time Spent: {timeSpent}s</p>
  </div>
);

export default Results;
