import React, { useState,useEffect } from 'react'
import Alert from '../shared/Alert'
import Navbar from '../shared/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setLoding } from '../../redux/authSlice'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { setAlert } from '../../redux/appSlice'
import useGetCompanyById from '../../hooks/useGetCompanyById'

const CompanySetup = () => {
  const params = useParams()
  useGetCompanyById(params.id)
  
  const {loading} =  useSelector(store=> store.auth)
  const {singleCompany} = useSelector(store => store.company)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [input,setInput] = useState({
    companyName:'',
    description:'',
    website:'',
    location:'',
    file:null
  })

  function changeEvtHandler(e){
    setInput({...input,[e.target.name]:e.target.value})
  }
  function changeFileHandler(e){
    setInput({...input,file:e?.target?.files?.[0]})
  }

  async function submitHandler(e){
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('companyName',input.companyName)
    formdata.append('description',input.description)
    formdata.append('website',input.website)
    formdata.append('location',input.location)
    if(input.file){
      formdata.append('file',input.file)
    }
    try {
      dispatch(setLoding(true))
      const res = await fetch(`${COMPANY_API_END_POINT}/update/${params.id}`,{
        method:'POST',
        credentials:'include',
        body:formdata
      })

      const data  = await res.json()
      if(!res.ok){
        dispatch(setAlert(data.message))
        return
      }
      if(data.success){
        dispatch(setAlert(data.message))
        navigate('/recruiter/company')
      }
    } catch (error) {
      console.log(error)
    }
    finally{
      setTimeout(()=>{
        dispatch(setLoding(false))
      },800)
    }
  }

  useEffect(() => {
    setInput({
      companyName:singleCompany.companyName || '' ,
      description:singleCompany.description || '',
      website:singleCompany.website || '',
      location:singleCompany.location || '',
      file:singleCompany.logo || null
    })
  }, [singleCompany])
  
  return (
    <>
      <Alert></Alert>
      <Navbar></Navbar>
      <div style={{width:'100vw',display:'flex',justifyContent:'center',paddingTop:'10px'}} >

        <div>
            <div style={{paddingInline:'15px',  display:'flex',alignItems:'center',gap:'20px',marginBottom:'20px'}} >
              <button className='bg-w'  onClick={()=> navigate('/recruiter/company')}  style={{color:'gray', display:'flex',alignItems:'center',gap:'10px',fontSize:'16px',border:'1px solid lightgray',borderRadius:'7px',padding:'10px 15px'}} >
                <span className={`material-symbols-outlined`}>arrow_back</span>
                Back
              </button>
              <h2>Company Setup</h2>
            </div>

            <form onSubmit={submitHandler}>
              <div className='fieldCont'>
                <div className='fieldbox'>
                  <label htmlFor="companyName">Company Name</label>
                  <input type="text" id="companyName"  name="companyName"  value={input.companyName} onChange={changeEvtHandler}  />
                </div>
                <div className='fieldbox'>
                  <label htmlFor="description">Description</label>
                  <textarea rows={6}  type="text" id="description"  name="description"  value={input.description} onChange={changeEvtHandler}  required/>
                </div>
                <div className='fieldbox'>
                  <label htmlFor="website" >Website</label>
                  <input type="text" name="website"  id="website"  value={input.website} onChange={changeEvtHandler}/>
                </div>
                <div className='fieldbox'>
                  <label htmlFor="location">Location</label>
                  <input type="text" name="location" id="location" value={input.location} onChange={changeEvtHandler} required/>
                </div>

                <div className='fieldbox'>
                  <label htmlFor="file">Logo</label>
                  <input type="file" accept="image/*" id="file"  name="file" onChange={changeFileHandler}/>
                </div>
              </div>
              {
              loading 
                ?<button className='loaderwrap submitbtn'>
                    <div className="loader"></div> 
                    <small>Please wait..</small>
                  </button>  
                :<button className='submitbtn'>Update</button>
              }
            </form>
        </div>
      </div>
    </>
  )
}

export default CompanySetup