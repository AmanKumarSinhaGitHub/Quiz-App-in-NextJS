'use client';

import Image from 'next/image';
import { useRouter } from "next/navigation";

export default function SubjectCard({ subject }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/quiz/${subject.name.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    >
      <Image
        src={subject.image} 
        alt={`${subject.name} image`}
        width={400} 
        height={300} 
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="p-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <h2 className="text-2xl font-bold text-center text-black mb-2">{subject.name}</h2>
        <p className="text-center text-black text-lg">{subject.questions.length} Questions</p>
      </div>
    </div>
  );
}
