import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch,useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'


const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const {searchedQuery} = useSelector(store => store.job)

    const fetchAlljobs = async()=>{
        try {
            const res = await fetch(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{
                method: 'GET',
                credentials: 'include' 
            })        
            const data =  await res.json()
            if(data.success){
                dispatch(setAllJobs(data.jobs))
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchAlljobs()
    },[])
}

export default useGetAllJobs