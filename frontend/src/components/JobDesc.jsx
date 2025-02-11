import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '../redux/jobSlice'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant'
import {setAlert} from '../redux/appSlice'
import Alert from './shared/Alert'
import Avatar from './shared/Avatar'
import ToggleTheme from './shared/ToggleTheme'

const JobDesc = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const jobId = params.id
    
    const {singleJob} = useSelector(store => store.job)
    const {user} = useSelector(store => store.auth)
    const [isApplied,setIsApplied] = useState(false)

    async function applyJobHandler(){
        if(!user?.profile?.resume){
            dispatch(setAlert('Upload Your resume first'))
            return
        }
        try {
            const res = await fetch(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{
                method:'get',
                credentials:'include'
            })
            const data = await res.json()
            if(!res.ok){
                dispatch(setAlert(data.message))
                return
            }
            if(data.success){
                dispatch(setAlert(data.message))
                setIsApplied(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchJobById = async()=>{
        try {
            const res = await fetch(`${JOB_API_END_POINT}/get/${jobId}`,{
                method: 'GET',
                credentials: 'include' 
            })        
            const data =  await res.json()
            if(data.success){
                dispatch(setSingleJob(data.job))
                setIsApplied(singleJob?.applications.some(application => application.applicant === user?._id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchJobById()
    },[])

  return (
      <div style={{width:'100vw',minHeight:'100vh'}} className='jobDescMain'>
        <Alert></Alert>
        <div className='box' >
            <div className='top' style={{marginTop:'15px'}} >
                <div style={{display:'flex',gap:'10px',justifyContent:'center',paddingBlock:'10px'}} >
                        <Avatar url={`${singleJob?.company?.logo}`} size={'30px'} ></Avatar>
                        <h2 style={{}} >{singleJob?.company.companyName}</h2>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',paddingBlock:'30px',flexWrap:'wrap',columnGap:'60px',rowGap:'20px'}} >
                    <div>
                        <h2 style={{marginBottom:'8px'}} >{singleJob?.title}</h2>
                        <div className='badgeWrap'>
                            <span className='badge'>{singleJob?.position} Positions</span>
                            <span className='badge'>{singleJob?.jobType}</span>
                            <span className='badge'>{singleJob?.salary}LPA</span>
                        </div>
                    </div>
                    <button 
                        style={{color:'white', fontSize:'16px' ,padding:'8px 12px',borderRadius:'8px',border:'none',backgroundColor:isApplied?'gray':'#4A90E2',cursor:isApplied?'not-allowed':'pointer' }}  
                        disabled={isApplied}
                        onClick={isApplied ?null:  applyJobHandler}
                        className={isApplied?'':'hover-effect'}
                    >{isApplied ? 'Already Applied': 'Apply Now'}
                    </button>

                </div>
            </div>

            <div className="bottom">
                <h3 style={{borderBottom:'1px solid lightgray'}} >Job Description</h3>
                <div className="desc" style={{marginBlock:'18px',display:'flex',flexDirection:'column',gap:'9px',fontSize:'19px'}} >
                    <div>
                        <strong style={{marginRight:'8px'}} >  Role: </strong>
                        <span style={{color:'gray'}} >{singleJob?.title}</span>
                    </div>  
                    <div>
                        <strong style={{marginRight:'8px'}} >  Type: </strong>
                        <span style={{color:'gray'}} >{singleJob?.jobType}</span>
                    </div>  
                    <div>
                        <strong style={{marginRight:'8px'}} >  Location: </strong>
                        <span style={{color:'gray'}} >{singleJob?.location}</span>
                    </div>  
                    <div>
                        <strong style={{marginRight:'8px'}} >  Description: </strong>
                        <span style={{color:'gray'}} >{singleJob?.description}</span>
                    </div>  
                    <div>
                        <strong style={{lineHeight:'30px'}} >  Requirements: </strong>
                        {
                           singleJob?.requirements.map((req,idx)=>(
                                <li key={idx}  style={{color:'gray',marginBlock:'3px'}} > {req}</li>
                            ))
                        }
                    </div>  
                    <div>
                        <strong style={{marginRight:'8px'}} >  Experience: </strong>
                        <span style={{color:'gray'}} >{singleJob?.experience} years</span>
                    </div>  
                    <div>
                        <strong style={{marginRight:'8px'}} > Salary: </strong>
                        <span style={{color:'gray'}} >{singleJob?.salary}Lpa</span>
                    </div>  
                    <div>
                        <strong style={{marginRight:'8px'}} > Openings: </strong>
                        <span style={{color:'gray'}} >{singleJob?.position}</span>
                    </div>  
                    <div>
                        <strong style={{marginRight:'8px'}} > Total Applicants: </strong>
                        <span style={{color:'gray'}} >{singleJob?.applications.length}</span>
                    </div>  
                    <div>
                        <strong style={{marginRight:'8px'}} > Posted Date: </strong>
                        <span style={{color:'gray'}} >{singleJob?.createdAt.split('T')[0]}</span>
                    </div>  
                </div>

            </div>

        </div>
    </div>
  )
}

export default JobDesc