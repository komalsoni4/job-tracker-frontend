import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';

type Job = {
    id?: string;
    company: string;
    role: string;
    location: string;
    jobId: string;
    url?: string;
    dateSaved: string;
    resumeFilename?: string;
};

// Define the props for JobCard to correctly receive 'appliedDate'
type JobCardProps = {
    company: string;
    role: string;
    location: string;
    jobId: string;
    appliedDate: string;
};

const Home = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('https://job-tracker-backend-2-hpoz.onrender.com/api/jobs');
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data: Job[] = await response.json();
                
                // Map the fetched data to include 'appliedDate'
                const formattedJobs = data.map(job => ({
                    ...job,
                    appliedDate: job.dateSaved.split('T')[0] // Format the date
                }));

                setJobs(formattedJobs as Job[]); // Cast to satisfy TypeScript
                
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-6">Your Job Applications</h1>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {jobs.map((job, idx) => (
                    // Pass the mapped object to JobCard
                    <JobCard 
                        key={job.id || idx} 
                        company={job.company}
                        role={job.role}
                        location={job.location}
                        jobId={job.jobId}
                        appliedDate={job.dateSaved.split('T')[0]} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;