import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSingleJob } from '../redux/jobSlice'
import { JOB_API_END_POINT } from '../utils/constant'

const useGetJobById = (jobId) => {
    const dispatch = useDispatch()

    const fetchJobById = async()=>{
        try {
            const res = await fetch(`${JOB_API_END_POINT}/get/${jobId}`,{
                method: 'GET',
                credentials: 'include' 
            })        
            const data =  await res.json()
            if(data.success){
                dispatch(setSingleJob(data.job))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchJobById()
    },[jobId,dispatch])
}

export default useGetJobById