import { useLoaderData } from "react-router-dom";

const JobDetails = () => {
    const {title,company,deadline} = useLoaderData();
    // console.log(job)
    return (
        <div className="m-10">
            <h2 className="text-3xl">Hello Job Details for:{title}</h2>
            <p>Apply For: {company}</p>
            <p>DeadLine:{deadline}</p>
            <button className="btn btn-primary">Apply Now</button>
        </div>
    );
};

export default JobDetails;