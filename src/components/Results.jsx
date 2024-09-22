"use client";

const Results = ({
  score,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  unattemptedQuestions, 
  percentage,
  timeSpent,
  averageTimePerQuestion,
}) => (
  <div className="p-4">
    <h2 className="text-xl font-semibold">Quiz Results</h2>
    <p>Points Earned: {score}</p>
    <p>Total Questions: {totalQuestions}</p>
    <p>Correct Answers: {correctAnswers}</p>
    <p>Wrong Answers: {wrongAnswers}</p>
    <p>Unattempted Questions: {unattemptedQuestions}</p> 
    <p>Percentage: {percentage}%</p>
    <p>Total Time Spent: {timeSpent.toFixed(2)}s</p>
    <p>Average Time per Question: {averageTimePerQuestion}s</p>
  </div>
);

export default Results;
