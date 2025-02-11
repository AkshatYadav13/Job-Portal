import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()

    async function fetchCompanyById() {
        try {
            const res = await fetch(`${COMPANY_API_END_POINT}/get/${companyId}`,{
                method:'Get',
                credentials:'include'
            })
            const data = await res.json()

            if(data.success){
                dispatch(setSingleCompany(data.company))
                return
            }
        } catch (error) {
            console.log(error)
        }        
    }
    useEffect(()=>{
        fetchCompanyById()
    },[companyId,dispatch])
}

export default useGetCompanyById