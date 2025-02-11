import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../redux/appSlice'
import { setSingleCompany } from '../../redux/companySlice'
import Alert from '../shared/Alert'

const CreateCompany = () => {
    const navigate = useNavigate()
    const [companyName,setCompanyName] = useState('')    
    const dispatch = useDispatch()
    
    async function RegisterNewCompany(){
        try {
            const res = await fetch(`${COMPANY_API_END_POINT}/register`,{
                method:'POST',
                credentials:'include',
                body:  JSON.stringify({companyName}),
                headers:{
                    "Content-Type":'application/json'
                }
            })
            const data = await res.json()
            if(!res.ok){
                dispatch(setAlert(data.message))
                return
            }
            if(data.success){
                dispatch(setAlert(data.message))
                dispatch(setSingleCompany(data?.company))
                const companyId = data?.company?._id
                navigate(`/recruiter/company/${companyId}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    < >
        <Alert></Alert>
        <Navbar></Navbar>
        <div style={{width:'100vw',display:'flex',justifyContent:'center',paddingTop:'50px'}} >
            <div className='formBox' style={{width:'50vw',display:'flex' ,flexDirection:'column',gap:'40px', paddingInline:'20px'}} >
                <div>
                    <h1 style={{marginBlock:'5px'}} >Your Company Name</h1>
                    <p>A company name is often your first impression with customers. </p>
                    <p>So make it count !!</p>
                </div>

                <div style={{display:'flex',flexDirection:'column',gap:'10px'}} >
                    <label htmlFor="companyName">Company Name</label>
                    <input onChange={(e)=>{setCompanyName(e.target.value)}}  type="text"  placeholder='You can change it later' id='companyName' name='companyName'/>
                </div>
                <div>
                    <button className='bg-w c-w '  onClick={()=>navigate('/recruiter/company')}  style={{fontSize:'17px',padding:'10px',border:'1px solid gray',borderRadius:'5px'}} >Cancel</button>
                    <button className='bg-w'  onClick={()=>RegisterNewCompany()}  style={{color:'white',  fontSize:'17px',padding:'10px',marginInline:'10px',borderRadius:'5px', backgroundColor:'#4A90E2', border:'none'}}  >Continue</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default CreateCompany