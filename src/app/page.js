'use client';

import SubjectCard from '@/components/SubjectCard';

export default function Home() {
  const subjects = ["Math", "Science", "History"];

  return (
    
      <div className="p-4">
        <h1 className="text-2xl mb-4">Welcome to the Quiz App</h1>
        <p className="mb-6">Select a subject to get started!</p>

        <div className="grid grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject} subject={subject} />
          ))}
        </div>
      </div>
    
  );
}
