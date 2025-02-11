import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import css from '../../css/applicants.module.css'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setAlert } from '../../redux/appSlice'
import { setAllAppicants } from '../../redux/applicationSlice'
import Alert from '../shared/Alert'
import { Link } from 'react-router-dom'

const Applicants = () => {
    const [open,setOpen]  = useState(false)
    const dispatch = useDispatch()
    const params = useParams()
    const {applicants} = useSelector(store => store.application)

    async function statusHandler(status,id) {
        try {
            const res = await fetch(`${APPLICATION_API_END_POINT}/updateStatus/${id}`,{
                method:'POST',
                credentials:'include',
                body:JSON.stringify({status}),
                headers:{
                    "Content-Type":'application/json'
                }
            })            
            const data = await res.json()
            console.log(data)
            if(!res.ok){
                dispatch(setAlert(data.message))
                return
            }
            if(data.success){
                dispatch(setAlert(data.message))

            }

        } catch (error) {
            console.log(error)
        }
    }

    async function fetchAllApplicants() {
        try {
            const res = await fetch(`${APPLICATION_API_END_POINT}/applicants/${params.id}`,{
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
                dispatch(setAllAppicants(data.job))
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    function toggleOpen(id){
        setOpen(()=>{
            return open===id ? null : id
        })
    }

    useEffect(()=>{
        fetchAllApplicants()
    },[])

  return (
    <div>
        <Alert></Alert>
        <Navbar></Navbar>
        <div className={css.main}>
        {
        applicants?.applications?.length <=0 ? <p style={{fontSize:'18px'}} >No applicant yet</p>
        :
            <div className={css.second} >
                <h2>Applicants {applicants?.applications?.length}</h2>
                <div className={`${css.tableWrap} custom-scrollbar`} >
                    <div className={css.table} >
                        <div className={`${css.heading} ${css.row}`}>
                            <h3>Full Name</h3>
                            <h3>Email</h3>
                            <h3>Contact</h3>
                            <h3>Resume</h3>
                            <h3>Date</h3>
                            <h3>Action</h3>
                        </div>
                    {applicants?.applications?.map((application,idx)=>(
                        <div className={css.row} key={idx} >
                        <p>{application.applicant.fullname}</p>
                        <p>{application.applicant.email}</p>
                        <p>{application.applicant.phoneNumber}</p>
                        <Link target='blank' style={{color:'#4A90E2' ,width:'170px',textDecoration:'none'}}   to={application.applicant.profile.resume} >{application.applicant.profile.resumeOriginalName}</Link>
                        <p>{application.applicant.createdAt.split('T')[0]}</p>
                        {
                            application.status === 'accepted' || application.status === 'rejected'
                            ? 
                            <p className={application.status} style={{borderRadius:'10px',paddingLeft:'8px'}} >{application.status}</p>
                            :
                            <span  style={{position:'relative'}} className={`material-symbols-outlined`} onClick={()=>toggleOpen(application._id)} >
                                {
                                    open===application._id &&
                                    <div className='bg-w'  style={{position:'absolute',zIndex:'9',left:'80px',boxShadow:'1px 2px 4px rgba(0,0,0,0.5)',display:'flex',flexDirection:'column'}} >
                                        <button className='c-w myhover'  onClick={()=>statusHandler('accepted',application._id)}  style={{padding:'13px 30px',fontSize:'17px',border:'none'}} >
                                            Accept
                                        </button>
                                        <button className='c-w myhover'  onClick={()=>statusHandler('rejected',application._id)}  style={{fontSize:'17px',border:'none',padding:'13px 30px'}} >
                                            Reject
                                        </button>
                                    </div>
                                }                            
                                more_horiz
                            </span>
                        }
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

export default Applicants