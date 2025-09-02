import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';

// This type should match your backend's JobApplication model
type Job = {
  company: string;
  role: string;
  location: string;
  jobId: string;
  url: string; // Add url to match your backend
  appliedDate: string;
};

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Function to fetch and display jobs (same as before)
  const fetchJobs = async () => {
    try {
      const res = await fetch('https://job-tracker-backend-2-hpoz.onrender.com/api/jobs');
      const data = await res.json();
      const formattedJobs = data.map((job: any) => ({
        company: job.company,
        role: job.role,
        location: job.location,
        jobId: job.jobId,
        appliedDate: job.dateSaved.split('T')[0],
      }));
      setJobs(formattedJobs);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  // This is the new function to submit form data
  const handleJobSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('https://job-tracker-backend-2-hpoz.onrender.com/api/jobs/upload', {
        method: 'POST',
        body: formData, // The key change is using a FormData object as the body
      });

      if (res.ok) {
        console.log('Job application submitted successfully!');
        // Re-fetch jobs to update the list
        fetchJobs();
      } else {
        console.error('Failed to submit job application.');
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Job Applications</h1>
      {/* Example form for submission */}
      <form onSubmit={handleJobSubmit}>
        <input type="text" name="company" placeholder="Company" required />
        <input type="text" name="role" placeholder="Role" required />
        <input type="text" name="location" placeholder="Location" required />
        <input type="text" name="jobId" placeholder="Job ID" required />
        <input type="text" name="url" placeholder="URL" required />
        <input type="file" name="resume" />
        <button type="submit">Submit</button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-8">
        {jobs.map((job, idx) => (
          <JobCard key={idx} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Home;