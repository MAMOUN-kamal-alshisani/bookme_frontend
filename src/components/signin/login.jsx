import { AuthContext } from "../../context/auth_context";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./scss/login.css";
import { HiArrowSmRight } from "react-icons/hi";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const {error, dispatch } = useContext(AuthContext);

  const loginHandler = async () => {
    dispatch({ type: "LOGIN_START" });
 if(credentials.username && credentials.password !== ''){
  try {
  
    const res = await axios.post("/api/auth/signin", credentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
    navigate("/");

  } catch (err) {

    console.log(err);
    dispatch({ type: "LOGIN_FAIL", payload: err.response.data });
  }
  
 }

  };
  return (
<div className="login">
        <div className="lContainer">
          <h2 className="formHeader">Login</h2>
         <form className="form" onSubmit={(e)=>e.preventDefault()}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            onChange={handleChange}
            value={credentials.username}

            required
          />
       
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={credentials.password}
            required
          />
          <button onClick={loginHandler} className="loginBtn">
            Login
          </button>
          </form>
          <div className="signUpContainer">
            <p>dont have an account?</p>
            <button onClick={()=>navigate("/sign-up")}>Sign Up Now!<HiArrowSmRight className="arrowIcon"/></button>
          </div>
          {error && <span>{error}</span>}
        </div>
      </div>
  );
}

export default Login;
