

type JobProps = {
  company: string;
  role: string;
  location: string;
  jobId: string;
  appliedDate: string;
};

const JobCard = ({ company, role, location, jobId, appliedDate }: JobProps) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold text-gray-800">{company}</h2>
      <p className="text-sm text-gray-600">{role} — {location}</p>
      <p className="text-xs text-gray-400 mt-2">Job ID: {jobId}</p>
      <p className="text-xs text-gray-400">Applied on: {appliedDate}</p>
    </div>
  );
};

export default JobCard;
