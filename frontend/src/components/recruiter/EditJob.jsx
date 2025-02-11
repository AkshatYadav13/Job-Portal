import React, { useState,useEffect } from 'react'
import Alert from '../shared/Alert'
import Navbar from '../shared/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setLoding } from '../../redux/authSlice'
import { JOB_API_END_POINT } from '../../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { setAlert } from '../../redux/appSlice'
import useGetJobById from '../../hooks/useGetJobById'

const CompanySetup = () => {
    const params = useParams()
    useGetJobById(params.id)

    const {loading} =  useSelector(store=> store.auth)
    const {singleJob} = useSelector(store => store.job)
    const {companies} = useSelector(store => store.company)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [input,setInput] = useState({
        title:'',
        description:'',
        requirements:'',
        salary:'',
        location:'',
        jobType:'',
        experience:'',
        position:1,
        companyId:'',
    })
    function changeEvtHandler(e){
        setInput({...input,[e.target.name]:e.target.value})
    }
    function selectChangeHandler(e){
        const value  = e.target.value
        const selectedCompany = companies.find((company)=>
            company.companyName.toLowerCase() === value.toLowerCase()
        )
        setInput({...input,['companyId']:selectedCompany._id})
    }

    async function editJob(e){
        e.preventDefault()
        try {
            dispatch(setLoding(true))
            const res = await fetch(`${JOB_API_END_POINT}/edit/${params.id}`,{
                method:'POST',
                credentials:'include',
                body:JSON.stringify(input),
                headers:{
                    'Content-type':'application/json'
                }
            })
            const data = await res.json()
            if(!res.ok){
                dispatch(setAlert(data.message))
                dispatch(setLoding(false))
                return
            }
            if(data.success){
                // setTimeout(()=>{
                    dispatch(setAlert(data.message))
                    navigate('/recruiter/jobs')
                    dispatch(setLoding(false))
                // },700)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setInput({
          title:singleJob.title || '' ,
          description:singleJob.description || '',
          requirements:singleJob.requirements.join(', ') || '',
          salary:singleJob.salary || '',
          jobType:singleJob.jobType || '',
          experience:singleJob.experience || '',
          position:singleJob.position || '',
          location:singleJob.location || '',
        })
      }, [singleJob])    
  
  return (
    <>
      <Alert></Alert>
      <Navbar></Navbar>
      <div style={{display:'flex',justifyContent:'right', paddingTop:'10px',paddingRight:'70px',gap:'80px'}} >

        <div>
            <div style={{paddingInline:'15px',  display:'flex',alignItems:'center',gap:'20px',marginBottom:'20px'}} >
              <button className='bg-w' onClick={()=> navigate('/recruiter/jobs')}  style={{color:'gray', display:'flex',alignItems:'center',gap:'10px',fontSize:'16px',border:'1px solid lightgray',borderRadius:'7px',padding:'10px 15px'}} >
                <span className={`material-symbols-outlined`}>arrow_back</span>
                Back
              </button>
              <h2>Job Setup</h2>
            </div>

            <form onSubmit={editJob}  className='formBg'  style={{padding:'40px 20px',boxShadow:'1px 2px 4px rgba(0,0,0,0.8)'}} >
                <div  style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'30px 25px'}}  >
                    <div className='fieldbox'>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title"  name="title"  value={input.title} onChange={changeEvtHandler}  />
                    </div>

                    <div className='fieldbox'>
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description"  name="description"  value={input.description} onChange={changeEvtHandler}  />
                    </div>
                    <div className='fieldbox'>
                        <label htmlFor="requirements">Requirements</label>
                        <input type="text" id="requirements"  name="requirements"  value={input.requirements} onChange={changeEvtHandler}  />
                    </div>

                    <div className='fieldbox'>
                        <label htmlFor="salary">Salary</label>
                        <input type="text" id="salary"  name="salary"  value={input.salary} onChange={changeEvtHandler}  />
                    </div>
                    <div className='fieldbox'>
                        <label htmlFor="location">Location</label>
                        <input type="text" id="location"  name="location"  value={input.location} onChange={changeEvtHandler}  />
                    </div>

                    <div className='fieldbox'>
                        <label htmlFor="jobType">Job Type</label>
                        <input type="text" id="jobType"  name="jobType"  value={input.jobType} onChange={changeEvtHandler}  />
                    </div>
                    <div className='fieldbox'>
                        <label htmlFor="experience">Experience</label>
                        <input type="text" id="experience"  name="experience"  value={input.experience} onChange={changeEvtHandler}  />
                    </div>

                    <div className='fieldbox'>
                        <label htmlFor="position">No of Openings</label>
                        <input type="number" id="" min={1}  name="position"  value={input.position} onChange={changeEvtHandler}  />
                    </div>

                    <div className='fieldbox' >
                        <label htmlFor="options">Company:</label>
                        <select id="options" name="options" onChange={selectChangeHandler} >
                            <option  value=""  selected disabled>select a company</option>
                            {companies.map((company)=>
                               <option key={company._id}  value={company?.companyName} >{company.companyName}</option>
                            )}
                        </select>
                    </div>

                </div>
                {
                loading 
                ?<button className={`submitbtn loaderwrap`}>
                    <div className="loader"></div> 
                    <small>Please wait..</small>
                    </button>  
                :<button className='submitbtn'>Update</button>
                }
            </form>
        </div>

        <div style={{color:'lightcoral',paddingTop:'50px' , display:'flex',flexDirection:'column',gap:'15px',fontSize:'18px'}} >
            <p>Note</p>
            <p>1. "Use commas to separate individual requirements."</p>
            <p>e.g - Proficient in Python, Experience with Django.</p>
        </div>
      </div>
    </>
  )
}

export default CompanySetup

