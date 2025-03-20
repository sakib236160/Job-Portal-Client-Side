import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../hookes/UseAuth";

const AddJob = () => {

  const {user}=useAuth();

  const handleAddJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(formData);
    const initialData = Object.fromEntries(formData.entries());
    console.log(initialData);

    const {max,min,currency, ...newJob} = initialData;
    console.log(newJob);

    newJob.salaryRange = {max,min,currency}
    newJob.requirements = newJob.requirements.split('\n')
    newJob.responsibilities =newJob.responsibilities.split('\n')
    console.log(newJob);


    fetch('http://localhost:5000/jobs',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newJob)
    })
    .then(res=>res.json())
    .then(data=>{
       if(data.insertedId){
                      Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Jobs has been addede",
                          showConfirmButton: false,
                          timer: 1500
                        });
      
                        navigate('/myApplications')
                  }
    })

  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-center mb-6">Post a New Job</h2>
      <form onSubmit={handleAddJob} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Title */}
          <div>
            <label className="block text-lg font-semibold">Job Title</label>
            <input
              type="text"
              name="title"
              className="w-full p-2 border rounded-md"
              placeholder="Job Title"
              required
            />
          </div>
          {/* Job Location */}
          <div>
            <label className="block text-lg font-semibold">Job Location</label>
            <input
              type="text"
              name="location"
              className="w-full p-2 border rounded-md"
              placeholder="Job Location"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Type */}
          <div>
            <label className="block text-lg font-semibold">Job Type</label>
            <select defaultValue='Pick a Job Type' name="jobType" className="w-full p-2 border rounded-md">
              <option disabled >Pick a Job Type</option>
              <option>Full-Time</option>
              <option>Intern</option>
              <option>Part-Time</option>
            </select>
          </div>
          {/* Job Field */}
          <div>
            <label className="block text-lg font-semibold">Job Field</label>
            <select defaultValue='Pick a Job Field' name="jobField" className="w-full p-2 border rounded-md">
              <option disabled>Pick a Job Field</option>
              <option>Engineering</option>
              <option>Marketing</option>
              <option>Finance</option>
              <option>Teaching</option>
            </select>
          </div>
        </div>
        {/* Job Description */}
        <div>
          <label className="block text-lg font-semibold">Job Description</label>
          <textarea name="description" className="w-full p-2 border rounded-md" placeholder="Job description" required></textarea>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {/* Min Salary */}
          <div>
            <label className="block text-lg font-semibold">Min Salary</label>
            <input type="text" name="min" className="w-full p-2 border rounded-md" placeholder="Min" required />
          </div>
          {/* Max Salary */}
          <div>
            <label className="block text-lg font-semibold">Max Salary</label>
            <input type="text" name="max" className="w-full p-2 border rounded-md" placeholder="Max" required />
          </div>
          {/* Currency */}
          <div>
            <label className="block text-lg font-semibold">Currency</label>
            <select defaultValue='Currency' name="currency" className="w-full p-2 border rounded-md">
              <option disabled>Currency</option>
              <option>BDT</option>
              <option>USD</option>
              <option>INR</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* HR Name */}
          <div>
            <label className="block text-lg font-semibold">HR Name</label>
            <input type="text" name="hr_name" className="w-full p-2 border rounded-md" placeholder="HR Name" required />
          </div>
          {/* HR Email */}
          <div>
            <label className="block text-lg font-semibold">HR Email</label>
            <input defaultValue={user?.email} type="email" name="hr_email" className="w-full p-2 border rounded-md" placeholder="HR Email" required />
          </div>
          {/* Application Deadline */}
          <div>
            <label className="block text-lg font-semibold">Deadline</label>
            <input type="date" name="applicationDeadline" className="w-full p-2 border rounded-md" placeholder="Deadline" required />
          </div>
        </div>
        {/* Company Name */}
        <div>
          <label className="block text-lg font-semibold">Company Name</label>
          <input type="text" name="company" className="w-full p-2 border rounded-md" placeholder="Company Name" required />
        </div>
        {/* Job Requirements */}
        <div>
          <label className="block text-lg font-semibold">Job Requirements</label>
          <textarea className="w-full p-2 border rounded-md" placeholder="put Each Requirements in a new Line" name="requirements" required></textarea>
          </div>
             {/* Job Responsibilities */}
             <div>
          <label className="block text-lg font-semibold">Job Responsibilities</label>
          <textarea  className="w-full p-2 border rounded-md" placeholder="Write Each Responsibilities in a new Line" name="responsibilities" required></textarea>
          </div>
        {/* Company Logo URL */}
        <div>
          <label className="block text-lg font-semibold">Company Logo URL</label>
          <input type="text" name="company_logo" className="w-full p-2 border rounded-md" placeholder="Company Logo URL" required />
        </div>
        {/* Submit Button */}
        <button className="w-full bg-blue-500 text-white p-3 rounded-md text-lg font-bold hover:bg-blue-600 transition">Submit</button>
      </form>
    </div>
  );
};

export default AddJob;
