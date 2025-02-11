import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
import { useSelector } from 'react-redux'

const filterData = [
  {
    filterType:'Location',
    array:['Dehli NCR','Bangalore','Hydrabad','Pune','Chennai','Mumbai']
  },
  {
    filterType:'Role',
    array:['Frontend Developer','Backend Developer','AI-ML Developer','FullStack Developer','Prompt Engineer','Software Engineer']
  },
]


const FilterCard = () => {

  const [input,setInput] = useState({
    Location:[],
    Role:[],
    SalaryMin:null,
    SalaryMax:null
  })
  const dispatch = useDispatch()

  function checkboxFilterHandler(e) {
    let arr
    const { name, value } = e.target;
    if(input[name].includes(value.toLowerCase())){
      arr = input[name].filter((item)=> item!=value.toLowerCase())
    }
    else{
      arr =  [...input[name],value.toLowerCase()]
    }
    if(!arr.includes('none')){
      arr = [...arr,'none']
    }
    setInput({
      ...input,
      [name]: arr,  
    });
  }

  function numberFilterHandler(e){
    setInput({...input,[e.target.name]:e.target.value || null})
  }
  
  useEffect(()=>{
    if(input.Location.length>0 || input.Role.length>0 || input.SalaryMin || input.SalaryMin || (!input.SalaryMin || !input.SalaryMin))
      dispatch(setSearchedQuery(input))
  },[input])

  return (
    <div style={{width:'250px', display:'flex',flexDirection:'column',gap:'20px'}} >

      {/* <div style={{display:'flex',width:'100%',flexWrap:'wrap',gap:'12px'}} >
        <p style={{display:'flex',gap:'6px',alignItems:'center',borderRadius:'12px',border:'1px solid gray',padding:'1px 10px',fontSize:'18px'}} >
            <span  style={{fontSize:'18px'}} className="material-symbols-outlined">close</span>
            Bangalore
        </p>
        <p style={{display:'flex',gap:'6px',alignItems:'center',borderRadius:'12px',border:'1px solid gray',padding:'1px 10px',fontSize:'18px'}} >
            <span  style={{fontSize:'18px'}} className="material-symbols-outlined">close</span>
            Bangalore
        </p>
      </div> */}
      <div className='bg-w' style={{maxHeight:'120vh', width:'250px',padding:'20px'}} >

        <h2 style={{color:'gray', fontWeight:'500', marginBottom:'20px',borderBottom:'1px solid lightgray'}} >Filter Jobs</h2>
        <div>
          {
            filterData.map((item,idx)=>(
              <div key={idx} style={{marginBlock:"20px",display:'flex',flexDirection:'column' ,gap:'10px'}}>
                <h3 style={{textDecoration:'underline'}} >{item.filterType}</h3>
                {item.array.map((list,idx)=>(
                  <div key={idx}  style={{display:'flex',gap:'8px'}} >
                  <input
                  type="checkbox"
                  name={item.filterType}
                  value={list}
                  id={list}
                  onChange={checkboxFilterHandler}
                  />
                 <label  htmlFor={list}>{list}</label>
                  </div>
                ))}
              </div>
            ))
          }
          <h3  style={{textDecoration:'underline'}} >Salary (lakhs) </h3>
          <div style={{display:'flex', gap:'15px', marginTop:'20px',alignItems:'center'}} >
            <input type="number"  min={1} name='SalaryMin' style={{width:'70px'}}  onChange={numberFilterHandler} />
            <p>--</p>
            <input type="number"  min={3} name='SalaryMax' style={{width:'70px'}}  onChange={numberFilterHandler} />
          </div>
        </div>
      </div>
  </div>
  )
}

export default FilterCard