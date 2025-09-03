import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';

// Define the correct type for the job data received from the backend
type Job = {
  id?: string; // id is optional because the backend auto-generates it
  company: string;
  role: string;
  location: string;
  jobId: string;
  url?: string; // url is optional
  dateSaved: string; // The date as a string
  resumeFilename?: string; // The filename from the backend
};

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Function to fetch data from the backend API
    const fetchJobs = async () => {
      try {
        // Use your deployed Render backend URL
        const response = await fetch('https://job-tracker-backend-2-hpoz.onrender.com/api/jobs');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data: Job[] = await response.json();
        
        // The backend returns 'dateSaved', but your JobCard expects 'appliedDate'.
        // We map the data to match the expected format.
        const formattedJobs = data.map((job) => ({
          ...job,
          appliedDate: job.dateSaved.split('T')[0] // Format the date to YYYY-MM-DD
        }));

        setJobs(formattedJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    // Call the fetch function when the component mounts
    fetchJobs();
  }, []); // The empty dependency array ensures this runs only once

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Job Applications</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {jobs.map((job, idx) => (
          // Use the id from the backend as the key, or the index if id is not present
          <JobCard key={job.id || idx} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Home;