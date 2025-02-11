import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import css from "../../css/auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import Alert from "../shared/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setLoding } from "../../redux/authSlice";
import { setAlert } from "../../redux/appSlice";


const SignUp = () => {
  const dispatch  = useDispatch()
  const navigate = useNavigate()

  const {loading,user} = useSelector(store => store.auth)

  const [input,setInput] = useState({
    fullname:'',
    phoneNumber:'',
    email:'',
    password:'',
    role:'',
    file:'',
  })

  function changeEvtHandler(e){
    setInput({...input,[e.target.name]:e.target.value})
  } 
  function changeFileHandler(e){
    setInput({...input,file:e.target.files?.[0]})
  } 

  async function submitHandler(e){
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullname',input.fullname)
    formData.append('phoneNumber',input.phoneNumber)
    formData.append('email',input.email)
    formData.append('password',input.password)
    formData.append('role',input.role)
    if(input.file){
      formData.append('file',input.file)
    }
    try {
      dispatch(setLoding(true))
      const res = await fetch(`${USER_API_END_POINT}/register`,{
        method:'POST',
        credentials:'include',
        body:formData,
      })
      const data = await res.json();
      dispatch(setAlert(data.message))

      if(data.success){
        setTimeout(() => {
          navigate('/login');
        }, 1500); 
       }

    } catch (error) {
      console.log(error)
    }
    finally{
      setTimeout(()=>{
        dispatch(setLoding(false))
      },1200)
    }
  }

    useEffect(()=>{
      if(user){
        navigate('/')
      }
    },[])

  return (
    <>
      <Navbar></Navbar>
      <div className={css.content}>
        <form onSubmit={submitHandler}>
          <h1>Sign Up</h1>
          <div className='fieldCont'>
            <div className='fieldbox'>
              <label htmlFor="fullname">Full Name</label>
              <input type="text" id="fullname"  name="fullname"  value={input.fullname} onChange={changeEvtHandler}  />
            </div>
            <div className='fieldbox'>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="tel" id="phoneNumber"  name="phoneNumber"  value={input.phoneNumber} onChange={changeEvtHandler}  />
            </div>
            <div className='fieldbox'>
              <label htmlFor="email" >Email</label>
              <input type="email" name="email"  id="email"  value={input.email} onChange={changeEvtHandler}/>
            </div>
            <div className='fieldbox'>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={input.password} onChange={changeEvtHandler} />
            </div>
            <div>
              <p>Please select your Role</p>
              <div className={css.roleOptions} >
                <div className={css.rolebox} >
                    <input 
                      type="radio"
                      name="role"
                      id="student"
                      value="student"   
                      checked={input.role === 'student'}
                      onChange={changeEvtHandler}
                      /> 

                  <label htmlFor="student">Student</label>
                </div>
                <div className={css.rolebox} >
                    <input
                      type="radio"
                      name="role"
                      id="recruiter"
                      value="recruiter"
                      checked={input.role === 'recruiter'}
                      onChange={changeEvtHandler}
                       /> 
                  <label htmlFor="recruiter">Recruiter</label>
                </div>
              </div>
            </div>

            <div className='fieldbox'>
              <label htmlFor="profile">Profile</label>
              <input type="file" accept="filename"  id="profile"  name="profile" onChange={changeFileHandler} />
            </div>
          </div>
          {
          loading 
            ?<button className={`submitbtn loaderwrap`}>
                <div className="loader"></div> 
                <small>Please wait..</small>
              </button>  
            :<button className='submitbtn'>Sign UP</button>
          }
          <span className={css.query} >Already have an account?<Link to='/login' >Login</Link></span>
        </form>
        <Alert></Alert>
      </div>
    </>
  );
};

export default SignUp;
