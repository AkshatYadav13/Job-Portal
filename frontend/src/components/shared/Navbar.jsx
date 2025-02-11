import React, { useState } from "react";
import css from "../../css/navbar.module.css";
import Avatar from "./Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import {setAlert} from '../../redux/appSlice'
import {setUser} from '../../redux/authSlice'
import ToggleTheme from './ToggleTheme.jsx'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector(store => store.auth)
  let [open, setopen] = useState(false);

  function handleOnclick() {
    setopen(!open);
  }

  async function logoutHandler(){
    try {
      const res = await fetch(`${USER_API_END_POINT}/logout`)
      const data = await res.json()
      if(data.success){
        dispatch(setAlert(data.message))
        dispatch(setUser(null))
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={css.navbar}>
        <h2 className={css.appname}>
          Job<span>Portal</span>
        </h2>
        <div className={css.right}>
          <ul>
            {
              user?.role === 'recruiter' 
              ?<>
                <Link to='/recruiter/company' className="link" ><li>Companies</li></Link>
                <Link to='/recruiter/jobs' className="link" ><li>Jobs</li></Link>
              </>
              :
              <>
                <Link to='/' className="link" ><li>Home</li></Link>
                <Link to='/jobs' className="link" ><li>Jobs</li></Link>
                <Link to='/browse' className="link"  ><li>Browse</li></Link>
              </>
            }
          </ul>
          <div className={css.profileWrap}>
            <div className={css.toggleBtn} >
                <ToggleTheme></ToggleTheme>
            </div>
            {user?
              <div onClick={handleOnclick}>
                <Avatar
                  url={user?.profile?.profilePhoto}
                  size={"40px"}
                ></Avatar>
              </div>
            :
            <div className={css.authbtn}>
              <Link to='/login' >
                  <button className="link" >Login</button>
              </Link>
              <Link to='/signup' >
                  <button className={css.signup} style={{color:'white'}}  >Sign Up</button>
              </Link>
            </div>
            }
          </div>
        </div>
      </div>
      {open && (
        <div className={css.popover}>
          <div className={css.top}>
            <div className={css.topleft} >
            <Avatar
              url={user?.profile?.profilePhoto}
              size={"40px"}
            ></Avatar>
            <div>
              <h3>{user?.fullname}</h3>
              <p>{user?.role[0].toUpperCase() + user?.role.slice(1) }</p>
            </div>
            </div>
            <span className={`material-symbols-outlined`} onClick={handleOnclick} >close</span>
          </div>
          <div className={css.options}>
            {
              user?.role !== 'recruiter' &&
                <Link className="c-w link" to='/profile'>
                  <div className={css.wrap} >
                    <span className={`material-symbols-outlined`}>person</span>
                    <span>View Profile</span>
                  </div>
                </Link>
            }
            <div className={css.wrap} style={{fontSize:'19px'}} >
              <ToggleTheme type='box' ></ToggleTheme>
            </div>

            <Link className="c-w link" to='/logout' onClick={logoutHandler}>
                  <div className={css.wrap} >
                    <span className={`material-symbols-outlined`}>Logout</span>
                    <span>Logout</span>
                  </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
