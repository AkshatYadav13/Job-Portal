import React from 'react'
import Avatar from "./shared/Avatar";
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { setAlert } from '../redux/appSlice';
import Alert from './shared/Alert';

const Job = ({job}) => {
  const navigate = useNavigate()
  const {user}  = useSelector(store => store.auth)
  const dispatch = useDispatch()

  function daysAgo(mongodbTime){
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDiff = currentTime - createdAt
    return Math.floor(timeDiff/(1000*24*60*60))
  }

  function showDetails(){
    if(!user){
      dispatch(setAlert('Create Account to unlock all features'))
      return
    }
    navigate(`/description/${job?._id}`)
  }

  return (
    <>
    <Alert></Alert>
    <div className='bg-w'  style={{position:'relative',  padding:'15px 25px', display:'flex', flexDirection:'column', gap:'27px',boxShadow:'1px 2px 2px rgba(0,0,0,0.5)',borderRadius:'5px'}} >
        <p>{
            daysAgo(job.createdAt)===0 ? 'Today' : `${daysAgo(job.createdAt)} days ago`
        }</p>
        <span className={`material-symbols-outlined`} style={{position:'absolute',  right:'20px',top:'15px', border:'1px solid #999', borderRadius:'50%', padding:'4px' }} >bookmark</span>
        <div style={{display:'flex', gap:'15px'}}>
            <Avatar url={`${job.company.logo}`} size={'40px'} ></Avatar>
            <div>
                <h2>{job.company.companyName}</h2>
                <p>India</p>
            </div>
        </div>
        <div>
            <h2>{job.title}</h2>
            <p style={{fontSize:'18px',marginBlock:'6px',color:'gray'}} >{job.description}</p>
        </div>
        <div className='badgeWrap'>
                <span className='badge'>{job.position} Positions</span>
                <span className='badge'>{job.jobType}</span>
                <span className='badge'>{job.salary}LPA</span>
        </div>
        <div style={{display:'flex' , gap:'10px'}} >
            <button onClick={showDetails}  style={{padding:'10px 12px', borderRadius:'12px', border:'none', fontSize:'15px'}} >Details</button>
            <button className='bg-p  hover-effect' style={{ color:'white',padding:'10px 12px', borderRadius:'12px', border:'none', fontSize:'15px'}} >Save For Later</button>
        </div>
    </div>
    </>
  )
}

export default Job