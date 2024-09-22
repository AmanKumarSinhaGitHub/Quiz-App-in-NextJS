"use client";

import Link from 'next/link';
import { usePoints } from "@/context/PointsContext";

const Header = () => {
  const { points } = usePoints();

  return (
    <header className="bg-gray-800 text-white py-4 sm:px-9 px-4 flex justify-between items-center">
      <Link href="/" className="text-2xl cursor-pointer">
        Quiz App
      </Link>
      <div>Points: {points}</div>
    </header>
  );
};

export default Header;
