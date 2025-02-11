import React from 'react'
import css from '../css/jobcard.module.css'
import { useNavigate } from 'react-router-dom'

const Jobcard = ({job}) => {
  const navigate = useNavigate()

  return (
    <div className={css.card} onClick={()=> navigate(`/description/${job._id}`)}  >
        <div>
        <h1 style={{fontWeight:'100'}} >{job?.company.companyName}</h1>
        <p style={{fontSize:'18px',marginBlock:'4px'}} >India</p>
        </div>
        <div>
            <h2>{job.title}</h2>
            <p style={{fontSize:'18px',marginBlock:'6px'}} >{job.description}</p>
        </div>
        <div>
            <div className='badgeWrap'>
                <span className='badge'>{job.position} Positions</span>
                <span className='badge'>{job.jobType}</span>
                <span className='badge'>{job.salary}LPA</span>
            </div>
        </div>
    </div>

  )
}

export default Jobcard