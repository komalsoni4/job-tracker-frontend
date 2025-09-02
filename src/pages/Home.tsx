import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';

// Define the type for the job data received from the backend
type Job = {
    id: string; // The ID from MongoDB
    company: string;
    role: string;
    location: string;
    jobId: string;
    url: string;
    dateSaved: string; // The date as a string
    resumeFilename: string; // The filename from the backend
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
                
                // Set the fetched data to the state
                setJobs(data);
                
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
                // Optionally, set state to show an error message to the user
            }
        };

        // Call the fetch function when the component mounts
        fetchJobs();
    }, []); // The empty dependency array ensures this runs only once

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-6">Your Job Applications</h1>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {jobs.map((job) => (
                    // The backend returns an 'id' field, so use it as a unique key
                    <JobCard 
                        key={job.id} 
                        company={job.company}
                        role={job.role}
                        location={job.location}
                        jobId={job.jobId}
                        appliedDate={job.dateSaved.split('T')[0]} // Format the date for display
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;