import { useParams } from "react-router-dom";
import useAuth from "../../hookes/UseAuth";
import Swal from "sweetalert2";


const JobApply = () => {
    const {id}=useParams();

    const {user}=useAuth();
    // console.log(id,user);

    const submitJobApplication = e =>{
        e.preventDefault()
        const form =e.target;
        const linkin =form.linkin.value;
        const github = form.github.value;
        const resume = form.resume.value;

        // console.log(linkin,github,resume)


        const jobApplication ={
            job_id: id,
            applicant_email: user.email,
            linkin,
            github,
            resume,
        }
        fetch('http://localhost:5000/job-applications',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(jobApplication)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    return (
       
    <div className="card bg-base-100 w-full  shadow-2xl">
    <h1 className="text-5xl font-bold text-center">Apply Job now!</h1>
      <form onSubmit={submitJobApplication } className="card-body">
        <fieldset className="fieldset">
          <label className="fieldset-label">LinkIn URL</label>
          <input name="linkin" type="url" className="input" placeholder="LinkIn URL" />
          <label className="fieldset-label">GitHub URL</label>
          <input name="github" type="url" className="input" placeholder="GitHub URL" />
          <label className="fieldset-label">Resume URL</label>
          <input name="resume" type="url" className="input" placeholder="Resume URL" />
          
          <button className="btn btn-neutral mt-4">Apply</button>
        </fieldset>
      </form>
</div>
    );
};

export default JobApply;