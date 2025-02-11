import React, { useEffect } from 'react'
import { setAppliedJobs } from "../redux/jobSlice";
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setAlert } from '../redux/appSlice';

const useGetAppliedJobs = () => {
    const dispatch = useDispatch()
    async function fetchAllAppliedJobs() {
        try {
            const res = await fetch(`${APPLICATION_API_END_POINT}/get`,{
                method:'Get',
                credentials:'include'
            })
            const data = await res.json()
            if(!res.ok){
                dispatch(setAlert(data.message))
                return
            }
            if(data.success){
                dispatch(setAlert(data.message))
                dispatch(setAppliedJobs(data.application))
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchAllAppliedJobs()
    },[])
}

export default useGetAppliedJobs