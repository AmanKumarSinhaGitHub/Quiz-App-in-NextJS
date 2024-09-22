"use client";

import { FaCoins } from "react-icons/fa6";

import Link from "next/link";
import { usePoints } from "@/context/PointsContext";

const Header = () => {
  const { points } = usePoints();

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
      {/* Logo / Home Link */}
      <Link
        href="/"
        className="text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
      >
        Quiz App
      </Link>

      {/* Points Display */}
      <div className="text-lg font-medium flex">
        <span>
          <FaCoins className="text-yellow-500 text-3xl mr-2" />
        </span>
        <span className="text-gray-300 mr-2">Points:</span>
        <span className="font-semibold text-blue-300">{points}</span>
      </div>
    </header>
  );
};

export default Header;
