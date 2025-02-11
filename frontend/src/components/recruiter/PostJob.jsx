import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { JOB_API_END_POINT } from '../../utils/constant'
import { useNavigate } from 'react-router-dom'
import { setAlert } from '../../redux/appSlice'
import Alert from '../shared/Alert'

const PostJob = () => {
    const {companies} = useSelector(store=> store.company)
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

    async function createNewJob(e){
        e.preventDefault()
        try {
            const res = await fetch(`${JOB_API_END_POINT}/post`,{
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
                return
            }
            if(data.success){
                dispatch(setAlert(data.message))
                setTimeout(()=>{
                    navigate('/recruiter/jobs')
                },1000)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div >
        <Navbar/>
        <Alert></Alert>
        <div className='postJobWrap' style={{display:'flex',justifyContent:'right',paddingLeft:'20px', paddingTop:'30px',paddingRight:'5.13vw',columnGap:'80px',rowGap:'40px'}}  >  
            <form onSubmit={createNewJob} className='formBg' style={{padding:'40px 20px',boxShadow:'1px 2px 4px rgba(0,0,0,0.5)'}} >
                <div  style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:'30px 25px'}}  >
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
                <button className='submitbtn' >Post New Job</button>
                {
                    companies.length<=0 &&
                    <p style={{color:'brown',textAlign:'center',fontSize:'17px'}} >*Please register a company first,before posting a job</p>
                }
            </form>

            <div style={{color:'lightcoral' , display:'flex',flexDirection:'column',gap:'15px',fontSize:'18px'}} >
                <p>Note</p>
                <p>1. "Use underscore to separate individual requirements."</p>
                <p>e.g - Proficient in Python_Experience with Django.</p>
                <p>2. You can edit job within 24hr of its creation</p>
            </div>

        </div>
    </div>
  )
}

export default PostJob