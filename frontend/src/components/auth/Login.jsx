import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import css from "../../css/auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../shared/Alert";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoding,setUser } from "../../redux/authSlice";
import { setAlert } from "../../redux/appSlice";

const Login = () => {

  const dispatch  = useDispatch()
  const navigate = useNavigate()

  const {loading,user} = useSelector(store => store.auth)

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  function changeEvtHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      dispatch(setLoding(true))
      const res = await fetch(`${USER_API_END_POINT}/login`,{
        method:'POST',
        credentials:'include',
        body:JSON.stringify(input),
        headers:{
          "Content-type":'application/json'
        },
      })
      const data = await res.json();
      if (!res.ok) {
        dispatch(setAlert(data.message))
        return;
      }
      
      if(data.success){
        setTimeout(()=>{
          dispatch(setUser(data.user))
          dispatch(setAlert(data.message))
          navigate('/');
        },1000)
      }
    } catch (error) {
      console.log(error)
    }
    finally{
      setTimeout(()=>{
        dispatch(setLoding(false))
      },1000)
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
          <h1>Login</h1>
          <div className='fieldCont'>
            <div className='fieldbox'>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={input.email}
                onChange={changeEvtHandler}
              />
            </div>
            <div className='fieldbox'>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={input.password}
                onChange={changeEvtHandler}
              />
            </div>
            <div>
              <p>Please select your Role</p>
              <div className={css.roleOptions}>
                <div className={css.rolebox}>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    id="student"
                    checked={input.role === "student"}
                    onChange={changeEvtHandler}
                  />
                   <label htmlFor="student">Student</label>
                </div>
                <div className={css.rolebox}>
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    id="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEvtHandler}
                  />
                   <label htmlFor="recruiter">Recruiter</label>
                </div>
              </div>
            </div>
          </div>
          {
          loading ?  <button className={`submitbtn loaderwrap `}><div className="loader"></div> <small>Please wait..</small></button>  :  <button className='submitbtn'>Login</button>
          }
          <span className={css.query}>
            Dont have an account?<Link to="/signup">Sign Up</Link>
          </span>
        </form>
        <Alert></Alert>
      </div>
    </>
  );
};

export default Login;
