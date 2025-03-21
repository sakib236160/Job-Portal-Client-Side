import Lottie from "lottie-react";
import signInLottieData from "../../assets/Lottie/signIn.json";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../../shared/SocialLogin";
import { useLocation, useNavigate } from "react-router-dom";


const SignIn = () => {

    const {signInUser} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    // console.log('In SignIn Page',location);
    const from = location.state || '/';

    const [error, setError] = useState("");
      const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
    
        // Password validation: কমপক্ষে ৬ ডিজিট + অন্তত ১টা বড় হাতের অক্ষর
        const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
          setError(
            "পাসওয়ার্ড কমপক্ষে ৬ ডিজিট হতে হবে এবং অন্তত ১টি বড় হাতের অক্ষর থাকতে হবে!"
          );
          return;
        }
        // সব ঠিক থাকলে কনসোলে দেখাবে
        console.log("Registered Successfully:", email, password);
        setError(""); // এরর ক্লিয়ার করবে
        // ইনপুট ফিল্ড ক্লিয়ার করবে
        form.reset();
    
        // console.log(email,password);
        signInUser(email,password)
        .then(result=>{
            console.log('signIn',result.user)
            navigate(from);
        })
        .catch(error=>{
            console.log(error)
        })
      };
    return (
        <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={signInLottieData}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-5xl font-bold">
            {" "}
            <span className="text-indigo-500">LogIn</span> now!
          </h1>
          <form onSubmit={handleSignIn} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
              />
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn bg-indigo-500 text-white font-semibold mt-4">
                LogIn
              </button>
            </fieldset>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
    );
};

export default SignIn;