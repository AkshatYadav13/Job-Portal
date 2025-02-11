import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import Category from './Category'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import Alert from './shared/Alert'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '../redux/jobSlice'

const Home = () => {
  
  const {user} = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useGetAllJobs()
  
  useEffect(()=>{
    if(user?.role==='recruiter'){
      navigate('/recruiter/company')
    }
  },[user,navigate])
  
  useEffect(()=>{
    dispatch(setSearchedQuery("")); 
  },[dispatch])

  return (
    <>
      <Alert></Alert>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <Category></Category>
      <LatestJobs></LatestJobs>
      <Footer></Footer>
    </>
  )
}

export default Home