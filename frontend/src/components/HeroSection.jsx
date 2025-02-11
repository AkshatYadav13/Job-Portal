import React, { useState } from 'react'
import css from '../css/heroSection.module.css'
import {useDispatch} from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
import {useNavigate} from 'react-router-dom'

const HeroSection = () => {
  const [query,setQuery] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function searchJobHandler(){
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }

  return (
    <div className={css.hero} >
        <div className={css.top}>
        <span>No.1 Job Hunt Website</span>
        <h1 className={css.title} >Search,Apply & <br/>Get Your <span>Dream Jobs</span></h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus cum minus quam distinctio dolore voluptatem mollitia id corporis provident error praesentium ipsum </p>
        <div className={css.searchwrap} >
            <input type="text" placeholder='Find your dream jobs' onChange={(e)=>setQuery(e.target.value)}  />
            <span onClick={searchJobHandler}  className="material-symbols-outlined">search</span>
        </div>
        </div>
    </div>
  )
}

export default HeroSection