import React, {  useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import css from '../../css/profile.module.css'
import Avatar from '../shared/Avatar'
import { useNavigate } from 'react-router-dom'
import Alert from '../shared/Alert'
import useGetRecruiterJobs from '../../hooks/useGetRecruiterJobs'
import { useSelector } from 'react-redux'

const RecruiterJobs = () => {
    useGetRecruiterJobs()
    const navigate = useNavigate()
    const [open,setOpen]  = useState(null)
    const [input,setInput] = useState('')
    const {allRecruiterJobs} = useSelector(store => store.job)
    const [filterJobs,setFilterJobs]  = useState(allRecruiterJobs)
    const {companies} = useSelector(store => store.company)

    function daysAgo(mongodbTime){
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date()
        const dataDiff = currentTime - createdAt
        return Math.floor(dataDiff/(1000*24*60*60))
    }

    function toggleOpen(companyId){
        setOpen(()=>{
            return open===companyId ? null : companyId
        })
    }

    useEffect(()=>{
        const filteredJobs = allRecruiterJobs.length>=0 && allRecruiterJobs.filter((job)=>{
            if(!input) return true

            return job?.title?.toLowerCase().includes(input.toLowerCase())  ||  job?.company?.companyName.toLowerCase().includes(input.toLowerCase())
        })
        setFilterJobs(filteredJobs)
    },[input,allRecruiterJobs])

  return (
    <div>
        <Alert></Alert>
        <Navbar/>
        <div style={{padding:'20px 150px' }} className='recMain'>

            <div style={{display:'flex',justifyContent:'space-between' ,flexWrap:'wrap',rowGap:'20px' }} className='topBox'  >
                <input type="text" name="" id="" placeholder='Filter by name, role' onChange={(e)=> {setInput(e.target.value)}}  />
                <button className='submitbtn'  onClick={()=> navigate('/recruiter/job/create')} >Post New Job</button>
            </div>

{/* table */}
            {   
            filterJobs?.length<=0 ?
                companies.length<=0 ?  <p  style={{marginBlock:'40px',fontSize:'20px',textAlign:'center'}} >You have not registered any company yet</p> :
                    allRecruiterJobs?.length<=0 ? <p style={{marginBlock:'40px',fontSize:'20px',textAlign:'center'}} >Start posting new jobs for your company</p>
                    :
                    <p style={{marginBlock:'40px',fontSize:'20px'}} >No result found</p>
            :
            <div className={css.second}  style={{width:'100%', marginBlock:'50px', marginInline:'0px'  }} >
                <div className={`${css.tableWrap} custom-scrollbar`} >
                    <div className={css.table} >
                        <div className={`${css.heading} ${css.row}`}>
                            <h3>Company</h3>
                            <h3>Role</h3>
                            <h3>Date</h3>
                            <h3>Action</h3>
                        </div>
                        {filterJobs?.map((job)=>(
                            <div key={job._id}  className={css.row} style={{fontSize:'18px'}} >
                                <div style={{display:'flex',alignItems:'center',gap:'25px'}} >
                                    <Avatar url={`${job?.company.logo}`} size={'25px'} ></Avatar>
                                    <p>{job?.company?.companyName}</p>
                                </div>
                                <p>{job?.title}</p>
                                <p>{job?.createdAt.split('T')[0]}</p>
                                <span  style={{position:'relative'}} className={`material-symbols-outlined`} onClick={()=>toggleOpen(job._id)} >
                                    {
                                        open===job._id &&
                                        <div className='bg-w'  style={{position:'absolute',zIndex:'9',left:'80px',boxShadow:'1px 2px 4px rgba(0,0,0,0.5)',display:'flex',flexDirection:'column',gap:'5px'}} >
                                            {
                                                daysAgo(job.createdAt)<=10 &&
                                            <button  className='myhover c-w'  onClick={()=>navigate(`/recruiter/job/${job._id}/edit`)}  style={{padding:'13px 25px',display:'flex',gap:'10px',fontSize:'17px',border:'none'}} >
                                                <span  style={{fontSize:'18px'}} className={`material-symbols-outlined`}>edit</span>
                                                Edit
                                            </button>
                                            }
                                            <button className='myhover c-w'  onClick={()=>navigate(`/recruiter/job/${job._id}/applicants`)}  style={{position:'relative',padding:'13px 30px',display:'flex',gap:'10px',fontSize:'17px',border:'none'}} >
                                                <span  style={{fontSize:'18px'}} className={`material-symbols-outlined`}>visibility</span>
                                                Applicants
                                                <span style={{position:'absolute',right:'5px',top:'-5px',backgroundColor:'#5DAEFF',borderRadius:'50%',padding:'3px 5px',color:'black',fontSize:'11px'}} >
                                                    {job.applications.length}
                                                </span>
                                            </button>
                                        </div>
                                    }                            
                                    more_horiz
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            }
        </div>
    </div>
  )
}

export default RecruiterJobs