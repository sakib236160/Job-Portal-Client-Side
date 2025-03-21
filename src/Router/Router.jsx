import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import SignIn from "../Pages/SignIn/SignIn";
import JobDetails from "../Pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../Pages/JobApply/JobApply";
import MyApplications from "../Pages/MyApplications/MyApplications";
import AddJob from "../Pages/AddJob/AddJob";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <h1>Route NotFound!</h1>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/jobs/:id",
          element:<PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
          loader: ({params})=>fetch(`http://localhost:5000/jobs/${params.id}`)
        },
        {
          path:"/jobApply/:id",
          element:<PrivateRoute><JobApply></JobApply></PrivateRoute>,
        },
        {
          path:"/myApplications",
          element:<PrivateRoute> <MyApplications></MyApplications> </PrivateRoute>
        },
        {
          path:"/AddJob",
          element:<PrivateRoute><AddJob></AddJob> </PrivateRoute>
        },
        {
            path:"register",
            element:<Register></Register>
        },
        {
            path:"signin",
            element:<SignIn></SignIn>
        }
      ]
    },
  ]);


  export default router;