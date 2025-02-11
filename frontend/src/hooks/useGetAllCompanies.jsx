import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '../utils/constant'
import {useDispatch} from 'react-redux'
import { setCompanies } from '../redux/companySlice'
import { setAlert } from '../redux/appSlice'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()

    async function fetchAllCompanies() {
        try {
            const res = await fetch(`${COMPANY_API_END_POINT}/get`,{
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
                dispatch(setCompanies(data.companies))
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchAllCompanies()
    },[])
}

export default useGetAllCompanies