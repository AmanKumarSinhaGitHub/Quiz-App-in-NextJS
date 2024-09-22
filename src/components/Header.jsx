"use client";

import { usePoints } from "@/context/PointsContext";

const Header = () => {
  const { points } = usePoints(); 

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl">Quiz App</h1>
      <div>Points: {points}</div>
    </header>
  );
};

export default Header;
