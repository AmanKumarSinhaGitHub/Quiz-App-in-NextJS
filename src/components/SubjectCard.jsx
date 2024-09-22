'use client';

import { useRouter } from "next/navigation";

export default function SubjectCard({ subject }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/quiz/${subject.name.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border p-4 rounded-md cursor-pointer hover:bg-blue-100 transition"
    >
      <h2 className="text-xl font-bold text-center">{subject.name}</h2>
    </div>
  );
}
