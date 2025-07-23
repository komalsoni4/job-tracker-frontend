import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';

type Job = {
  company: string;
  role: string;
  location: string;
  jobId: string;
  appliedDate: string;
};

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
   
   /* fetch('http://localhost:9090/api/jobs') // Spring Boot API
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Failed to fetch jobs:", err));
      */
     const dummyJobs: Job[] = [
      {
        company: "Google",
        role: "Software Engineer",
        location: "Bangalore",
        jobId: "G12345",
        appliedDate: "2025-07-20"
      },
      {
        company: "Amazon",
        role: "Data Analyst",
        location: "Hyderabad",
        jobId: "A78910",
        appliedDate: "2025-07-18"
      },
      {
        company: "Microsoft",
        role: "DevOps Engineer",
        location: "Remote",
        jobId: "M45678",
        appliedDate: "2025-07-15"
      }
    ];
      setJobs(dummyJobs);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Job Applications</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {jobs.map((job, idx) => (
          <JobCard key={idx} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Home;
