import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Avatar from "./shared/Avatar";
import css from '../css/profile.module.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant";
import { setLoding, setUser } from "../redux/authSlice";
import { setAlert } from "../redux/appSlice";
import Alert from "./shared/Alert";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";


const Profile = () => {
    useGetAppliedJobs()
    const [open,setOpen] = useState(false)
    const {loading,user} = useSelector(store => store.auth)
    const {appliedJobs} = useSelector(store => store.job)
    const dispatch = useDispatch()

    // update profile
    const [input,setInput] = useState({
        fullname:user?.fullname,
        phoneNumber:user?.phoneNumber,
        email:user?.email,        
        bio:user?.profile?.bio ,        
        skills:user?.profile?.skills.map(skill=>skill),
        file:user?.profile?.resume,        
    })
    function changeEvtHandler(e){
        setInput({...input,[e.target.name]:e.target.value})
    }
    function fileChangeHandler(e){
        const file = e.target.files?.[0]
        setInput({...input,file})
    }
    async function submitHandler(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullname',input.fullname)
        formData.append('phoneNumber',input.phoneNumber)
        formData.append('email',input.email)
        formData.append('bio',input.bio)
        formData.append('skills',input.skills)
        if(input.file){
            formData.append('file',input.file)
        }
        try {
            dispatch(setLoding(true))
            const res = await fetch(`${USER_API_END_POINT}/profile/update`,{
                method:'POST',
                credentials:'include',
                body:formData,
            })
            const data = await res.json()
            if (!res.ok) {
                dispatch(setAlert(data.message))
                return;
            }
            if(data.success){
                setTimeout(()=>{
                    dispatch(setLoding(false))
                    setOpen(false)
                    dispatch(setAlert(data.message))
                    dispatch(setUser(data.user))
                },1000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        open ? document.body.style.overflow = 'hidden' :  document.body.style.overflow = 'auto'
    },[open])
  return (
    <div>
        <Alert></Alert>
        <Navbar></Navbar>
      <div className={css.main}>
            <div className={css.first} >
                <div className={css.topwrap}>
                    <div className={css.idwrap} >
                        <Avatar url={user?.profile?.profilePhoto}size={"70px"}></Avatar>
                        <div className={css.nameBox} >
                            <h2 >{user?.fullname}</h2>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    
                    <div className={`${css.editProfileBtn}`} onClick={()=> setOpen(true)} >
                        <span className={`material-symbols-outlined`} >edit</span>
                        <span>Edit Profile</span>
                    </div>
                </div>
                <div className={css.contactwrap}>
                    <div className={css.contactbox} >
                        <span className={`material-symbols-outlined`}>mail</span>
                        <span>{user?.email}</span>
                    </div>
                    <div className={css.contactbox} >
                        <span className={`material-symbols-outlined`}>call</span>
                        <span>{user?.phoneNumber}</span>
                    </div>
                    <div>
                        {user?.profile?.skills.length<=0?
                        <p onClick={()=> setOpen(!open)} style={{color:'#4A90E2',cursor:'pointer'}}  >Showcase your skills</p>
                        :
                        <>
                        <h2 className={css.title} >Skills</h2>
                        <div style={{ display:'flex', gap:'10px' }} >
                            {user?.profile?.skills.map((item,idx)=>(
                                <span  key={idx}  className={css.skills}>{item}</span>
                            ))}
                        </div>
                        </>
                        }
                    </div>
                    {!user?.profile?.resume ?
                        <p onClick={()=> setOpen(!open)} style={{color:'#4A90E2',cursor:'pointer'}}  >Upload your resume</p>
                        :
                        <div>
                            <h2  className={css.title} >Resume</h2>
                            <Link to={user?.profile?.resume}  style={{color:'#4A90E2', fontSize:'18px',textDecoration:'none'}} target="blank" >{user?.profile?.resumeOriginalName}</Link>
                        </div>
                    }
                    
                </div>
            </div>
            {
                appliedJobs.length<=0 ? <p>Not applied for any job</p>
                :<div className={`${css.second}`} >
                        <h2>Applied Jobs</h2>
                        <div className={`${css.tableWrap} custom-scrollbar`} >
                            <div className={css.table} >
                                <div className={`${css.heading} ${css.row}`}>
                                    <h3>Date</h3>
                                    <h3>Company</h3>
                                    <h3>Job Role</h3>
                                    <h3>Status</h3>
                                </div>
                            {appliedJobs.map((item)=>(
                                <div  key={item._id}    className={css.row}>
                                    <p>{item.createdAt.split('T')[0]}</p>
                                    <div style={{display:'flex', gap:'20px', alignItems:'center'}} >
                                        <Avatar url={item.job.company.logo}size={"30px"}></Avatar>
                                        <p>{item.job.company.companyName}</p>
                                    </div>
                                    <p>{item.job.title}</p>
                                    <p className={`${css.status} ${item.status} `} >{item.status}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                </div>
            }
      </div>
      {/* update page */}
      {open &&
        <div className={css.updateProfile}>
            <div className={css.container}>
                <div className={css.topbox}>
                    <p style={{fontSize:'20px'}} >Update Profile</p>
                    {!loading &&   <span className={`material-symbols-outlined`} onClick={()=> setOpen(false)} >close</span>}
                </div>
                <form onSubmit={submitHandler}>
                    <div className={css.field}>
                        <label htmlFor="fullname">Name</label>
                        <input type="text" name="fullname" id="fullname"  value={input.fullname}  onChange={changeEvtHandler} />
                    </div>
                    <div className={css.field}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={input.email} onChange={changeEvtHandler} />
                    </div>
                    <div className={css.field}>
                        <label htmlFor="phoneNumber">Number</label>
                        <input type="tel" name="phoneNumber" id="phoneNumber" value={input.phoneNumber} onChange={changeEvtHandler} />
                    </div>
                    <div className={css.field}>
                        <label htmlFor="bio">Bio</label>
                        <input type="text" name="bio" id="bio" value={input.bio} onChange={changeEvtHandler} />
                    </div>
                    <div className={css.field}>
                        <label htmlFor="skills">Skills</label>
                        <input type="text" name="skills" id="skills" value={input.skills} onChange={changeEvtHandler} />
                    </div>
                    <div className={css.field}>
                        <label htmlFor="file">Resume</label>
                        <input type="file" name="file" id="file" accept="application/pdf"  onChange={fileChangeHandler} />
                    </div>
                    <div className={css.updatebtnbox}  >
                        {
                            loading ?  <button className={`loaderwrap  submitbtn`}><div className="loader"></div> <small>Please wait..</small></button>  :  <button className="submitbtn" >Update</button>
                        }
                    </div>
                </form>
            </div>
        </div>
      }
    </div>
  );
};

// give skills with comas
export default Profile;
