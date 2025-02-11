import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAlert } from '../redux/appSlice'
import { setAllRecruiterJobs } from '../redux/jobSlice'

const useGetRecruiterJobs = () => {
    const dispatch = useDispatch()

    async function fetchAllRecruiterJobs() {
        try {
         const res = await fetch(`${JOB_API_END_POINT}/getRecruiterJobs`,{
            method:'Get',
            credentials:'include'
         })   
         const data = await res.json()
         if(!res.ok){
            dispatch(setAlert(data.message))
            dispatch(setAllRecruiterJobs([]))
            return
         }
         if(data.success){
            dispatch(setAllRecruiterJobs(data.jobs))
            return
         }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchAllRecruiterJobs()
    },[])
}

export default useGetRecruiterJobs