import React from 'react'
import css from '../css/latestjobs.module.css'
import Jobcard from './Jobcard'
import {useSelector} from 'react-redux'


const LatestJobs = () => {
  const {allJobs} = useSelector((store) => store.job)

  return (

    <div className={css.main}>
        <h1 className={css.title} > <span>Latest & Top</span> Job Openings</h1>
        <div className={css.cardwrap}>
            {allJobs.length>0?
                allJobs.slice(0,6).map((job,idx)=>
                  <Jobcard  key={job._id}  job={job} ></Jobcard>
                )
                :<p>No latest jobs</p>
            }
        </div>
    </div>  
  )
}

export default LatestJobs