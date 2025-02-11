import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../redux/appSlice'

const ToggleTheme = ({type}) => {
    const {theme} = useSelector(store => store.app)
    const dispatch = useDispatch()

    function ToggleTheme(){
        dispatch(setTheme())
        document.body.className = (theme==='light'? 'dark_mode':'')
    }
    
    useEffect(()=>{
        document.body.className = (theme==='dark'? 'dark_mode':'')
    },[theme])

    
    if(type === 'box') 
        return(
            <div  onClick={ToggleTheme} style={{width:'100%',display:'flex', columnGap:'10px',cursor:'pointer'}}>
                <span  className={`material-symbols-outlined`}>
                    {theme==='light'? 'dark_mode'  : 'light_mode'}
                </span>
                {theme==='light'? 'Dark mode'  : 'Light mode'}
            </div>
        )
    else 
        return (
            <span onClick={ToggleTheme} className={`material-symbols-outlined`}>
                {theme==='light'? 'dark_mode'  : 'light_mode'}
            </span>
        )
    

}

export default ToggleTheme