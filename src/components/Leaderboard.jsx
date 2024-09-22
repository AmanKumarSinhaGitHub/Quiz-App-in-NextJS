"use client";

const Leaderboard = () => {
    const randomRank = Math.floor(Math.random() * 100) + 1;
  
    return (
      <div className="p-4">
        <h3>Your Rank: {randomRank}</h3>
      </div>
    );
  };
  
  export default Leaderboard;
  