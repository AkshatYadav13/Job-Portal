import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import css from '../../css/profile.module.css'
import Avatar from '../shared/Avatar'
import { useNavigate } from 'react-router-dom'
import Alert from '../shared/Alert'
import { useSelector } from 'react-redux'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'

const Companies = () => {
    useGetAllCompanies()
    const navigate = useNavigate()
    const [open,setOpen]  = useState(null)
    const {companies} = useSelector(store => store.company) 
    const [input,setInput] = useState('')
    const [filterCompanies,setFilterCompanies] = useState(companies)

    function toggleOpen(companyId){
        setOpen(()=>{
            return open===companyId ? null : companyId
        })
    }

    useEffect(()=>{
        const filteredCompanies = companies.length >=0 && companies.filter((company)=>{
            if(!input){
                return true
            }
            return company?.companyName?.toLowerCase().includes(input.toLowerCase())
        })
        setFilterCompanies(filteredCompanies)

    },[companies,input])
  return (
    <div>
        <Alert></Alert>
        <Navbar/>
        <div style={{padding:'20px 150px'}} className='recMain' >

            <div className='topBox'  style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',rowGap:'20px'}} >
                <input type="text" name="" id="" placeholder='Filter by name' onChange={(e)=> {setInput(e.target.value)}}  />
                <button className='submitbtn'  onClick={()=> navigate('/recruiter/company/create')} >New Company</button>
            </div>

{/* table */}
            {   
            filterCompanies?.length<=0 ? 
                companies.length<=0 ? 
                <p  style={{marginBlock:'40px',fontSize:'20px',textAlign:'center'}} >You have not registered any company yet</p> 
                :
                <p style={{marginBlock:'40px',fontSize:'20px'}} >No result found</p>

            :
            <div className={css.second}  style={{width:'100%', marginBlock:'50px',marginInline:'0px' }} >
                <div className={`${css.tableWrap} custom-scrollbar`} >
                    <div className={css.table} >
                        <div className={`${css.heading} ${css.row}`}>
                            <h3>Logo</h3>
                            <h3>Name</h3>
                            <h3>Date</h3>
                            <h3>Action</h3>
                        </div>
                        {filterCompanies.map((company)=>(
                            <div key={company._id}  className={css.row} style={{fontSize:'18px'}} >
                                <Avatar url={`${company.logo}`} size={'35px'} ></Avatar>
                                <p>{company.companyName}</p>
                                <p>{company.createdAt.split('T')[0]}</p>
                                <span  style={{position:'relative'}} className={`material-symbols-outlined`} onClick={()=>toggleOpen(company._id)} >
                                    {
                                        open===company._id &&
                                        <div style={{position:'absolute',zIndex:'9',left:'80px'}} >
                                            <button className='myhover c-w '  onClick={()=>navigate(`/recruiter/company/${company._id}`)}  style={{display:'flex',justifyContent:'center',gap:'10px',fontSize:'16px',border:'none',boxShadow:'1px 2px 4px rgba(0,0,0,0.5)',padding:'10px 23px'}} >
                                                <span  style={{fontSize:'18px'}} className={`material-symbols-outlined`}>edit</span>
                                                Edit
                                            </button>
                                        </div>
                                    }                            
                                    more_horiz
                                </span>
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

export default Companies