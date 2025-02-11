import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from '../hooks/useGetAllJobs'

const Browse = () => {
    useGetAllJobs()
    const {allJobs}  = useSelector(store => store.job)

    return (
    <div>
      <Navbar></Navbar>
      <div style={{padding: '10px 4vw'}} >
        <h2 >Search Results ({allJobs?.length})</h2>
        <div  className="browseBox"  style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(330px,1fr))',gap:'30px', marginBlock:'20px' }} >
        {allJobs.map((job)=>(
            <Job key={job._id} job={job} ></Job>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
