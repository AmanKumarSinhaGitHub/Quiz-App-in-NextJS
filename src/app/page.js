'use client';

import { useEffect, useState } from "react";
import SubjectCard from '@/components/SubjectCard';

export default function Home() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch('/data/questions.json');
      if (response.ok) {
        const data = await response.json();
        setSubjects(data.subjects);
        console.log(data);
      } else {
        console.error("Failed to fetch subjects");
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Welcome to the Quiz App</h1>
      <p className="mb-6">Select a subject to get started!</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <SubjectCard key={subject.name} subject={subject} />
          ))
        ) : (
          <p>Loading subjects...</p>
        )}
      </div>
    </div>
  );
}
