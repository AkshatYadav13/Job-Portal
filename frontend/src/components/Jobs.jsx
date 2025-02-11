import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import css from "../css/jobs.module.css";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";

const Jobs = () => {
  const {allJobs,searchedQuery}  = useSelector(store => store.job)
  const [filterJobs,setFilterJobs] = useState(allJobs)
  const [toggleFilterBox,setToggleFilterBox] = useState(false)


  useEffect(()=>{
    if(!searchedQuery.Location || (searchedQuery?.Location?.length<=1  && searchedQuery?.Role?.length<=1  && (searchedQuery?.SalaryMin==null || searchedQuery?.SalaryMax==null)) ){
      setFilterJobs(allJobs)
      return
    }
    else{
      const filteredJobs = allJobs.filter((job)=>{
        return (
          (searchedQuery?.Role.length<=1 || searchedQuery?.Role.includes(job.title.toLowerCase()) )&&
          (searchedQuery?.Location.length<=1 || searchedQuery?.Location.includes(job.location.toLowerCase()) )&&
          (searchedQuery?.SalaryMin == null || job.salary >= searchedQuery.SalaryMin) &&
          (searchedQuery?.SalaryMax == null || job.salary <= searchedQuery.SalaryMax)
        )
      })
      setFilterJobs(filteredJobs)
    }
  },[allJobs,searchedQuery])

   return (
    <div>
      <Navbar></Navbar>
      <div className={css.main}>
        <span className={`material-symbols-outlined  ${css.filterBtn}`} onClick={()=>setToggleFilterBox(!toggleFilterBox)} >{toggleFilterBox ? 'filter_list_off':'filter_list'}</span>

        <div className={`${css.filterBox} ${toggleFilterBox ? css.openFilterBox : css.closeFilterBox} `}>
            <FilterCard></FilterCard>
        </div>
        <div className={css.jobsWrap}>
          {filterJobs.length>0?
            filterJobs.map((job, idx) => 
              <Job key={job._id} job={job} ></Job>
            )
          :<p>No Jobs Avaliable</p>
        }
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Jobs;
