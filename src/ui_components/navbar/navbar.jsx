import './scss/navbar.css'
import { AuthContext } from "../../context/auth_context";
import {useState,useContext} from 'react'
import Login from '../../components/signin/login';
import SignUp from '../../components/signup/signUp';
import {Link } from "react-router-dom";

function Navbar(){
const {username} = useContext(AuthContext)  
    return(
        <div className="navbar">
        <div className="navbar_container">
            <span className="logo">BookMe</span>

            {!username?(

<div className="navList">
<Link to="/sign-up" className="btn btn-primary">
<button className="navBtn" onClick={()=><SignUp/>}>sign-up</button>
</Link>


        <Link to="/login" className="btn btn-primary">
<button className="navBtn" onClick={()=><Login/>}>sign-in</button>
</Link>
</div>):(<h3>{username.username}</h3>)
            }
      
        </div>
        </div>
    )
}

export default Navbar