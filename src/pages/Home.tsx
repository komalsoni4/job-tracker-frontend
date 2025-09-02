import { useEffect, useState } from 'react';
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
    fetch('https://job-tracker-backend-2-hpoz.onrender.com/api/jobs') // 
      .then(res => res.json())
      .then(data => {
        // You might need to map the data to match your 'Job' type
        const formattedJobs = data.map((job: any) => ({
          company: job.company,
          role: job.role,
          location: job.location,
          jobId: job.jobId,
          appliedDate: job.dateSaved.split('T')[0] // Format date to YYYY-MM-DD
        }));
        setJobs(formattedJobs);
      })
      .catch(err => console.error("Failed to fetch jobs:", err));

    /* The dummy data block is no longer needed
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
    */
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